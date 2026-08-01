import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { settingsService } from './service';

export const settingsController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const result = await settingsService.get(req.activeOrg!.id);
    ok(res, result, 'OK');
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await settingsService.update(req.activeOrg!.id, req.body, req.user!.id);
    ok(res, result, 'Settings updated');
  }),
};
