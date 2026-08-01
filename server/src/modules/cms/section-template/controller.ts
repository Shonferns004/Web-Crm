import type { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { sectionTemplateService } from './service';

export const sectionTemplateController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const templates = await sectionTemplateService.list(req.activeOrg?.id);
    res.json({ success: true, data: templates });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const template = await sectionTemplateService.create(req.activeOrg?.id, req.body, req);
    res.status(201).json({ success: true, data: template });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const template = await sectionTemplateService.update(
      req.activeOrg?.id,
      req.params.id,
      req.body,
      req,
    );
    res.json({ success: true, data: template });
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await sectionTemplateService.remove(req.activeOrg?.id, req.params.id, req);
    res.json({ success: true, data: true });
  }),
};
