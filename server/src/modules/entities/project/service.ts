import type { Request } from 'express';
import { ApiError } from '../../../utils/ApiError';
import { recordAudit } from '../../../utils/audit';
import { buildPaginated } from '../../../utils/pagination';
import { projectRepository } from './repository';

export const projectService = {
  async list(organizationId: string, params: {
    skip: number;
    take: number;
    search?: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    query: Record<string, unknown>;
  }) {
    const { items, total } = await projectRepository.list(organizationId, {
      skip: params.skip,
      take: params.take,
      search: params.search,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      status: typeof params.query.status === 'string' ? params.query.status : undefined,
      featured: typeof params.query.featured === 'string' ? params.query.featured : undefined,
    });
    return buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take);
  },

  async getById(organizationId: string, id: string) {
    const item = await projectRepository.findById(id);
    if (!item || item.organizationId !== organizationId) {
      throw ApiError.notFound('project not found');
    }
    return item;
  },

  async create(organizationId: string, data: Record<string, unknown>, req: Request) {
    const item = await projectRepository.create(organizationId, data);
    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'project',
      resourceId: item.id,
      message: 'project created',
      req,
    });
    return item;
  },

  async update(organizationId: string, id: string, data: Record<string, unknown>, req: Request) {
    await this.getById(organizationId, id);
    const item = await projectRepository.update(id, data);
    if (!item) throw ApiError.notFound('project not found');
    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'project',
      resourceId: id,
      message: 'project updated',
      req,
    });
    return item;
  },

  async remove(organizationId: string, id: string, req: Request) {
    await this.getById(organizationId, id);
    await projectRepository.remove(id);
    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'DELETE',
      resource: 'project',
      resourceId: id,
      message: 'project deleted',
      req,
    });
    return true;
  },
};
