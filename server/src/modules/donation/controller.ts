import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { donationService } from './service';
import { paginate } from '../../middlewares/paginate';

export const donationController = {
  list: [
    paginate(),
    asyncHandler(async (req: Request, res: Response) => {
      const p = req.pagination!;
      const result = await donationService.list({
        organizationId: req.activeOrg!.id,
        skip: p.skip,
        take: p.limit,
        search: p.search,
        sortBy: p.sortBy,
        sortOrder: p.sortOrder,
        status: (req.query.status as string) || undefined,
        campaignId: (req.query.campaignId as string) || undefined,
        donorId: (req.query.donorId as string) || undefined,
        from: req.query.from ? new Date(String(req.query.from)) : undefined,
        to: req.query.to ? new Date(String(req.query.to)) : undefined,
      });
      ok(res, result, 'OK');
    }),
  ],

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await donationService.create(req.activeOrg!.id, req.body, req);
    ok(res, result, 'Donation recorded', 201);
  }),
};
