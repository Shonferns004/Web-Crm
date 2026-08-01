import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { prisma } from '../../libs/prisma';
import { ApiError } from '../../utils/ApiError';
import { recordAudit } from '../../utils/audit';
import { buildPaginated } from '../../utils/pagination';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { authenticate } from '../../middlewares/auth';
import { orgScope } from '../../middlewares/orgScope';
import { rbac } from '../../middlewares/rbac';
import { validate } from '../../middlewares/validate';
import { paginate } from '../../middlewares/paginate';

type PrismaModelName = Exclude<
  keyof typeof prisma,
  'user' | 'organization' | 'role' | 'permission' | 'refreshToken' | 'auditLog' | 'notification' | 'media' | 'page' | 'pageSection' | 'menu' | 'menuItem' | 'banner' | 'slider' | 'sliderSlide' | 'organizationSetting' | 'organizationUser' | 'userRole' | 'userPermission' | 'rolePermission' | 'donation'
>;

interface SimpleDelegate {
  findMany: (args?: any) => Promise<any[]>;
  count: (args?: any) => Promise<number>;
  findFirst: (args?: any) => Promise<any>;
  findUnique: (args?: any) => Promise<any>;
  create: (args?: any) => Promise<any>;
  update: (args?: any) => Promise<any>;
  updateMany: (args?: any) => Promise<any>;
  delete: (args?: any) => Promise<any>;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

export interface CrudConfig {
  /** e.g. 'testimonial' */
  resource: string;
  /** prisma model key */
  model: string;
  /** permission prefix, e.g. 'testimonial' */
  permissionBase: string;
  searchFields: string[];
  createSchema: ZodSchema;
  updateSchema: ZodSchema;
  /** prisma select used for reads */
  select?: object;
  /** extra filters derived from query string, e.g. { categoryId: 'categoryId' } */
  extraFilters?: Record<string, string>;
  /** extra include for findById */
  include?: object;
  /** extra include for list */
  listInclude?: object;
  /** transform/populate data before create, e.g. derive slug */
  beforeCreate?: (data: Record<string, unknown>) => Record<string, unknown>;
  /** transform/populate data before update */
  beforeUpdate?: (data: Record<string, unknown>) => Record<string, unknown>;
  /** generate slug from a field when not provided */
  slugFrom?: string;
}

export function makeCrud(config: CrudConfig) {
  const delegate = (prisma[config.model as PrismaModelName] as unknown as SimpleDelegate);

  const repository = {
    async list(organizationId: string, params: {
      skip: number;
      take: number;
      search?: string;
      sortBy: string;
      sortOrder: 'asc' | 'desc';
      filters: Record<string, unknown>;
    }) {
      const where: Record<string, unknown> = {
        organizationId,
        ...(params.search && config.searchFields.length > 0
          ? {
              OR: config.searchFields.map((field) => ({
                [field]: { contains: params.search, mode: 'insensitive' },
              })),
            }
          : {}),
        ...params.filters,
      };
      const [items, total] = await Promise.all([
        delegate.findMany({
          where,
          ...(config.select ? { select: config.select } : {}),
          ...(config.listInclude ? { include: config.listInclude } : {}),
          orderBy: { [params.sortBy]: params.sortOrder },
          skip: params.skip,
          take: params.take,
        }),
        delegate.count({ where }),
      ]);
      return { items, total };
    },

    async findById(id: string) {
      return delegate.findUnique({
        where: { id },
        ...(config.select ? { select: config.select } : {}),
        ...(config.include ? { include: config.include } : {}),
      });
    },

    async create(organizationId: string, data: Record<string, unknown>) {
      let payload = { ...data };
      if (config.slugFrom && !payload.slug) {
        const source = payload[config.slugFrom];
        payload.slug = slugify(typeof source === 'string' ? source : '');
      }
      if (config.beforeCreate) {
        payload = config.beforeCreate(payload);
      }
      return delegate.create({ data: { ...payload, organizationId } });
    },

    async update(id: string, data: Record<string, unknown>) {
      let payload = { ...data };
      if (config.beforeUpdate) {
        payload = config.beforeUpdate(payload);
      }
      return delegate.update({ where: { id }, data: payload });
    },

    async delete(id: string) {
      return delegate.delete({ where: { id } });
    },
  };

  const service = {
    async list(organizationId: string, params: {
      skip: number;
      take: number;
      search?: string;
      sortBy: string;
      sortOrder: 'asc' | 'desc';
      query: Record<string, unknown>;
    }) {
      const filters: Record<string, unknown> = {};
      if (config.extraFilters) {
        for (const [queryKey, fieldKey] of Object.entries(config.extraFilters)) {
          const value = params.query[queryKey];
          if (typeof value === 'string' && value.length > 0) {
            filters[fieldKey] = value;
          }
        }
      }
      const { items, total } = await repository.list(organizationId, {
        skip: params.skip,
        take: params.take,
        search: params.search,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        filters,
      });
      return buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take);
    },

    async getById(organizationId: string, id: string) {
      const item = await repository.findById(id);
      if (!item || (item as { organizationId: string }).organizationId !== organizationId) {
        throw ApiError.notFound(`${config.resource} not found`);
      }
      return item;
    },

    async create(organizationId: string, data: Record<string, unknown>, req: Request) {
      const item = await repository.create(organizationId, data);
      await recordAudit({
        userId: req.user?.id,
        organizationId,
        action: 'CREATE',
        resource: config.resource,
        resourceId: (item as { id: string }).id,
        message: `${config.resource} created`,
        req,
      });
      return item;
    },

    async update(organizationId: string, id: string, data: Record<string, unknown>, req: Request) {
      await this.getById(organizationId, id);
      const item = await repository.update(id, data);
      await recordAudit({
        userId: req.user?.id,
        organizationId,
        action: 'UPDATE',
        resource: config.resource,
        resourceId: id,
        message: `${config.resource} updated`,
        req,
      });
      return item;
    },

    async remove(organizationId: string, id: string, req: Request) {
      await this.getById(organizationId, id);
      await repository.delete(id);
      await recordAudit({
        userId: req.user?.id,
        organizationId,
        action: 'DELETE',
        resource: config.resource,
        resourceId: id,
        message: `${config.resource} deleted`,
        req,
      });
      return true;
    },
  };

  const controller = {
    list: [
      paginate(),
      asyncHandler(async (req: Request, res: Response) => {
        const p = req.pagination!;
        const result = await service.list(req.activeOrg!.id, {
          skip: p.skip,
          take: p.limit,
          search: p.search,
          sortBy: p.sortBy,
          sortOrder: p.sortOrder,
          query: req.query,
        });
        ok(res, result, 'OK');
      }),
    ],
    getById: asyncHandler(async (req: Request, res: Response) => {
      const result = await service.getById(req.activeOrg!.id, req.params.id);
      ok(res, result, 'OK');
    }),
    create: asyncHandler(async (req: Request, res: Response) => {
      const result = await service.create(req.activeOrg!.id, req.body, req);
      ok(res, result, `${config.resource} created`, 201);
    }),
    update: asyncHandler(async (req: Request, res: Response) => {
      const result = await service.update(req.activeOrg!.id, req.params.id, req.body, req);
      ok(res, result, `${config.resource} updated`);
    }),
    remove: asyncHandler(async (req: Request, res: Response) => {
      await service.remove(req.activeOrg!.id, req.params.id, req);
      ok(res, true, `${config.resource} deleted`);
    }),
  };

  const router = Router();
  router.use(authenticate(), orgScope());
  router.get('/', rbac(`${config.permissionBase}:view`), ...controller.list);
  router.get('/:id', rbac(`${config.permissionBase}:view`), asyncHandler(controller.getById));
  router.post('/', rbac(`${config.permissionBase}:create`), validate(config.createSchema), asyncHandler(controller.create));
  router.patch('/:id', rbac(`${config.permissionBase}:update`), validate(config.updateSchema), asyncHandler(controller.update));
  router.delete('/:id', rbac(`${config.permissionBase}:delete`), asyncHandler(controller.remove));

  return { repository, service, controller, router };
}
