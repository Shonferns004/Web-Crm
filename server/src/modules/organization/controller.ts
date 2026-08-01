import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { organizationService } from './service';
import { paginate } from '../../middlewares/paginate';

export const organizationController = {
  list: [
    paginate(),
    asyncHandler(async (req: Request, res: Response) => {
      const p = req.pagination!;
      const result = await organizationService.list(
        {
          skip: p.skip,
          take: p.limit,
          search: p.search,
          sortBy: p.sortBy,
          sortOrder: p.sortOrder,
          status: (req.query.status as never) ?? undefined,
        },
        req.user,
      );
      ok(res, result, 'OK');
    }),
  ],

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.getById(req.params.id, req);
    ok(res, result, 'OK');
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.create(req.body, req);
    ok(res, result, 'Organization created', 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.update(req.params.id, req.body, req);
    ok(res, result, 'Organization updated');
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await organizationService.remove(req.params.id, req);
    ok(res, true, 'Organization deleted');
  }),

  getSettings: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.getSettings(req.params.id, req);
    ok(res, result, 'OK');
  }),

  updateSettings: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.updateSettings(req.params.id, req.body, req);
    ok(res, result, 'Settings updated');
  }),

  listUsers: [
    paginate(),
    asyncHandler(async (req: Request, res: Response) => {
      const p = req.pagination!;
      const result = await organizationService.listUsers(
        req.params.id,
        { skip: p.skip, take: p.limit, search: p.search },
        req,
      );
      ok(res, result, 'OK');
    }),
  ],

  createUser: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.createUser(req.params.id, req.body, req);
    ok(res, result, 'Website user created', 201);
  }),

  removeUser: asyncHandler(async (req: Request, res: Response) => {
    await organizationService.removeUser(req.params.id, req.params.userId, req);
    ok(res, true, 'Website user removed');
  }),

  listAdmins: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.listAdmins(req.params.id, req);
    ok(res, result, 'OK');
  }),

  assignAdmin: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.assignAdmin(req.params.id, req.body.userId, req);
    ok(res, result, 'Admin assigned to website', 201);
  }),

  removeAdmin: asyncHandler(async (req: Request, res: Response) => {
    await organizationService.removeAdmin(req.params.id, req.params.userId, req);
    ok(res, true, 'Admin unassigned from website');
  }),
};
