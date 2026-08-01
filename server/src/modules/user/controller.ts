import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { userService } from './service';
import { paginate } from '../../middlewares/paginate';

export const userController = {
  list: [
    paginate(),
    asyncHandler(async (req: Request, res: Response) => {
      const p = req.pagination!;
      const result = await userService.list(
        {
          skip: p.skip,
          take: p.limit,
          search: p.search,
          sortBy: p.sortBy,
          sortOrder: p.sortOrder,
          organizationId: (req.query.organizationId as string) || undefined,
        },
        req.user,
      );
      ok(res, result, 'OK');
    }),
  ],

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getById(req.params.id);
    ok(res, result, 'OK');
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.create(req.body, req);
    ok(res, result, 'User created', 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.update(req.params.id, req.body, req);
    ok(res, result, 'User updated');
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await userService.remove(req.params.id, req);
    ok(res, true, 'User deleted');
  }),

  assignOrg: asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.assignOrg(req.params.id, req.body, req);
    ok(res, result, 'User assigned to organization');
  }),

  removeFromOrg: asyncHandler(async (req: Request, res: Response) => {
    await userService.removeFromOrg(req.params.id, req.params.organizationId, req);
    ok(res, true, 'User removed from organization');
  }),

  memberships: asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.memberships(req.params.id);
    ok(res, result, 'OK');
  }),
};
