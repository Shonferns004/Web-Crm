import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/ApiResponse';
import { roleService } from './service';

export const roleController = {
  listRoles: asyncHandler(async (_req: Request, res: Response) => {
    const result = await roleService.listRoles();
    ok(res, result, 'OK');
  }),

  listPermissions: asyncHandler(async (_req: Request, res: Response) => {
    const result = await roleService.listPermissions();
    ok(res, result, 'OK');
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await roleService.getById(req.params.id);
    ok(res, result, 'OK');
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await roleService.create(req.body, req);
    ok(res, result, 'Role created', 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await roleService.update(req.params.id, req.body, req);
    ok(res, result, 'Role updated');
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await roleService.remove(req.params.id, req);
    ok(res, true, 'Role deleted');
  }),
};
