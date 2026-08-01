import type { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ok } from '../../../utils/ApiResponse';
import { bannerService } from './service';

export const bannerController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const result = await bannerService.list(req.activeOrg!.id);
    ok(res, result, 'OK');
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await bannerService.create(req.activeOrg!.id, req.body, req);
    ok(res, result, 'Banner created', 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await bannerService.update(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Banner updated');
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await bannerService.remove(req.activeOrg!.id, req.params.id, req);
    ok(res, true, 'Banner deleted');
  }),
};
