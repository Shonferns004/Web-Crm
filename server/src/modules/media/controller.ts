import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { mediaService } from './service';
import { paginate } from '../../middlewares/paginate';

export const mediaController = {
  list: [
    paginate(),
    asyncHandler(async (req: Request, res: Response) => {
      const p = req.pagination!;
      const result = await mediaService.list({
        organizationId: req.activeOrg!.id,
        skip: p.skip,
        take: p.limit,
        entityType: (req.query.entityType as string) || undefined,
        entityId: (req.query.entityId as string) || undefined,
        mimeType: (req.query.mimeType as string) || undefined,
      });
      ok(res, result, 'OK');
    }),
  ],

  upload: asyncHandler(async (req: Request, res: Response) => {
    const result = await mediaService.upload(
      req.activeOrg!,
      req.file!,
      {
        entityType: (req.body?.entityType as string) || undefined,
        entityId: (req.body?.entityId as string) || undefined,
      },
      req.user!.id,
    );
    ok(res, result, 'Uploaded', 201);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await mediaService.remove(req.activeOrg!.id, req.params.id, req.user!.id);
    ok(res, true, 'Media deleted');
  }),
};
