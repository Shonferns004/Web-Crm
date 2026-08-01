import type { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ok } from '../../../utils/ApiResponse';
import { pageService } from './service';
import { paginate } from '../../../middlewares/paginate';

export const pageController = {
  list: [
    paginate(),
    asyncHandler(async (req: Request, res: Response) => {
      const p = req.pagination!;
      const result = await pageService.list({
        organizationId: req.activeOrg!.id,
        skip: p.skip,
        take: p.limit,
        search: p.search,
        sortBy: p.sortBy,
        sortOrder: p.sortOrder,
        status: (req.query.status as never) ?? undefined,
      });
      ok(res, result, 'OK');
    }),
  ],

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await pageService.getById(req.activeOrg!.id, req.params.id);
    ok(res, result, 'OK');
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await pageService.create(req.activeOrg!.id, req.body, req);
    ok(res, result, 'Page created', 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await pageService.update(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Page updated');
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await pageService.remove(req.activeOrg!.id, req.params.id, req);
    ok(res, true, 'Page deleted');
  }),

  addSection: asyncHandler(async (req: Request, res: Response) => {
    const result = await pageService.addSection(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Section added', 201);
  }),

  updateSection: asyncHandler(async (req: Request, res: Response) => {
    const result = await pageService.updateSection(
      req.activeOrg!.id,
      req.params.id,
      req.params.sectionId,
      req.body,
      req,
    );
    ok(res, result, 'Section updated');
  }),

  removeSection: asyncHandler(async (req: Request, res: Response) => {
    await pageService.removeSection(
      req.activeOrg!.id,
      req.params.id,
      req.params.sectionId,
      req,
    );
    ok(res, true, 'Section deleted');
  }),

  reorderSections: asyncHandler(async (req: Request, res: Response) => {
    const result = await pageService.reorderSections(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Section order updated');
  }),
};
