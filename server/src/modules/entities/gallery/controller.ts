import type { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ok } from '../../../utils/ApiResponse';
import { galleryService } from './service';

export const galleryController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const p = req.pagination!;
    const result = await galleryService.list(req.activeOrg!.id, {
      skip: p.skip,
      take: p.limit,
      search: p.search,
      sortBy: p.sortBy,
      sortOrder: p.sortOrder,
      query: req.query,
    });
    ok(res, result, 'OK');
  }),
  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await galleryService.getById(req.activeOrg!.id, req.params.id);
    ok(res, result, 'OK');
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await galleryService.create(req.activeOrg!.id, req.body, req);
    ok(res, result, 'gallery created', 201);
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await galleryService.update(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'gallery updated');
  }),
  remove: asyncHandler(async (req: Request, res: Response) => {
    await galleryService.remove(req.activeOrg!.id, req.params.id, req);
    ok(res, true, 'gallery deleted');
  }),
};
