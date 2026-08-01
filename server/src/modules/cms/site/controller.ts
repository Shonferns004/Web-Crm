import type { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ok } from '../../../utils/ApiResponse';
import { siteService } from './service';

export const siteController = {
  getSite: asyncHandler(async (req: Request, res: Response) => {
    const result = await siteService.getSiteBySlug(req.params.slug);
    ok(res, result, 'OK');
  }),
};
