import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { notificationService } from './service';
import { paginate } from '../../middlewares/paginate';

export const notificationController = {
  list: [
    paginate(),
    asyncHandler(async (req: Request, res: Response) => {
      const p = req.pagination!;
      const result = await notificationService.list({
        userId: req.user!.id,
        skip: p.skip,
        take: p.limit,
        unreadOnly: req.query.unreadOnly === 'true',
      });
      ok(res, result, 'OK');
    }),
  ],

  markRead: asyncHandler(async (req: Request, res: Response) => {
    await notificationService.markRead(req.params.id, req.user!.id);
    ok(res, true, 'Notification marked as read');
  }),

  markAllRead: asyncHandler(async (req: Request, res: Response) => {
    await notificationService.markAllRead(req.user!.id);
    ok(res, true, 'All notifications marked as read');
  }),
};
