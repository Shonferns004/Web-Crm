import type { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ok } from '../../../utils/ApiResponse';
import { projectService } from './service';

export const projectController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const p = req.pagination!;
    const result = await projectService.list(req.activeOrg!.id, {
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
    const result = await projectService.getById(req.activeOrg!.id, req.params.id);
    ok(res, result, 'OK');
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await projectService.create(req.activeOrg!.id, req.body, req);
    ok(res, result, 'project created', 201);
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await projectService.update(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'project updated');
  }),
  remove: asyncHandler(async (req: Request, res: Response) => {
    await projectService.remove(req.activeOrg!.id, req.params.id, req);
    ok(res, true, 'project deleted');
  }),
};
