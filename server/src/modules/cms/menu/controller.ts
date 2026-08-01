import type { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ok } from '../../../utils/ApiResponse';
import { menuService } from './service';

export const menuController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const result = await menuService.list(req.activeOrg!.id);
    ok(res, result, 'OK');
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await menuService.getById(req.activeOrg!.id, req.params.id);
    ok(res, result, 'OK');
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await menuService.create(req.activeOrg!.id, req.body, req);
    ok(res, result, 'Menu created', 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await menuService.update(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Menu updated');
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await menuService.remove(req.activeOrg!.id, req.params.id, req);
    ok(res, true, 'Menu deleted');
  }),

  addItem: asyncHandler(async (req: Request, res: Response) => {
    const result = await menuService.addItem(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Menu item added', 201);
  }),

  updateItem: asyncHandler(async (req: Request, res: Response) => {
    const result = await menuService.updateItem(
      req.activeOrg!.id,
      req.params.id,
      req.params.itemId,
      req.body,
      req,
    );
    ok(res, result, 'Menu item updated');
  }),

  removeItem: asyncHandler(async (req: Request, res: Response) => {
    await menuService.removeItem(req.activeOrg!.id, req.params.id, req.params.itemId, req);
    ok(res, true, 'Menu item deleted');
  }),

  reorderItems: asyncHandler(async (req: Request, res: Response) => {
    const result = await menuService.reorderItems(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Menu item order updated');
  }),
};
