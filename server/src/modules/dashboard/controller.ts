import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { dashboardService } from './service';

export const dashboardController = {
  overview: asyncHandler(async (req: Request, res: Response) => {
    const result = await dashboardService.overview(req);
    ok(res, result, 'OK');
  }),

  websites: asyncHandler(async (req: Request, res: Response) => {
    const result = await dashboardService.websites(req);
    ok(res, result, 'OK');
  }),

  siteById: asyncHandler(async (req: Request, res: Response) => {
    const result = await dashboardService.siteById(req.params.id, req);
    ok(res, result, 'OK');
  }),

  myWebsite: asyncHandler(async (req: Request, res: Response) => {
    const result = await dashboardService.myWebsite(req);
    ok(res, result, 'OK');
  }),
};
