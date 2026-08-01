import type { Request } from 'express';
import { ApiError } from '../../../utils/ApiError';
import { recordAudit } from '../../../utils/audit';
import { buildPaginated } from '../../../utils/pagination';
import { galleryRepository } from './repository';

export const galleryService = {
  async list(organizationId: string, params: {
    skip: number;
    take: number;
    search?: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    query: Record<string, unknown>;
  }) {
    const { items, total } = await galleryRepository.list(organizationId, {
      skip: params.skip,
      take: params.take,
      search: params.search,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      status: typeof params.query.status === 'string' ? params.query.status : undefined,
    });
    return buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take);
  },

  async getById(organizationId: string, id: string) {
    const item = await galleryRepository.findById(id);
    if (!item || item.organizationId !== organizationId) {
      throw ApiError.notFound('gallery not found');
    }
    return item;
  },

  async create(organizationId: string, data: Record<string, unknown>, req: Request) {
    const item = await galleryRepository.create(organizationId, data);
    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'gallery',
      resourceId: item.id,
      message: 'gallery created',
      req,
    });
    return item;
  },

  async update(organizationId: string, id: string, data: Record<string, unknown>, req: Request) {
    await this.getById(organizationId, id);
    const item = await galleryRepository.update(id, data);
    if (!item) throw ApiError.notFound('gallery not found');
    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'gallery',
      resourceId: id,
      message: 'gallery updated',
      req,
    });
    return item;
  },

  async remove(organizationId: string, id: string, req: Request) {
    await this.getById(organizationId, id);
    await galleryRepository.remove(id);
    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'DELETE',
      resource: 'gallery',
      resourceId: id,
      message: 'gallery deleted',
      req,
    });
    return true;
  },
};
