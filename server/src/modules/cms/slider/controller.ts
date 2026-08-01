import type { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ok } from '../../../utils/ApiResponse';
import { sliderService } from './service';

export const sliderController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const result = await sliderService.list(req.activeOrg!.id);
    ok(res, result, 'OK');
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await sliderService.getById(req.activeOrg!.id, req.params.id);
    ok(res, result, 'OK');
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await sliderService.create(req.activeOrg!.id, req.body, req);
    ok(res, result, 'Slider created', 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await sliderService.update(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Slider updated');
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await sliderService.remove(req.activeOrg!.id, req.params.id, req);
    ok(res, true, 'Slider deleted');
  }),

  addSlide: asyncHandler(async (req: Request, res: Response) => {
    const result = await sliderService.addSlide(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Slide added', 201);
  }),

  updateSlide: asyncHandler(async (req: Request, res: Response) => {
    const result = await sliderService.updateSlide(
      req.activeOrg!.id,
      req.params.id,
      req.params.slideId,
      req.body,
      req,
    );
    ok(res, result, 'Slide updated');
  }),

  removeSlide: asyncHandler(async (req: Request, res: Response) => {
    await sliderService.removeSlide(req.activeOrg!.id, req.params.id, req.params.slideId, req);
    ok(res, true, 'Slide deleted');
  }),

  reorderSlides: asyncHandler(async (req: Request, res: Response) => {
    const result = await sliderService.reorderSlides(req.activeOrg!.id, req.params.id, req.body, req);
    ok(res, result, 'Slide order updated');
  }),
};
