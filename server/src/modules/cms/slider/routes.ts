import { Router } from 'express';
import { sliderController } from './controller';
import { authenticate } from '../../../middlewares/auth';
import { orgScope } from '../../../middlewares/orgScope';
import { rbac } from '../../../middlewares/rbac';
import { validate } from '../../../middlewares/validate';
import { asyncHandler } from '../../../utils/asyncHandler';
import {
  createSlideSchema,
  createSliderSchema,
  reorderSlidesSchema,
  updateSlideSchema,
  updateSliderSchema,
} from './schema';

const router = Router();

router.use(authenticate(), orgScope());

router.get('/', rbac('slider:view'), asyncHandler(sliderController.list));
router.get('/:id', rbac('slider:view'), asyncHandler(sliderController.getById));
router.post('/', rbac('slider:create'), validate(createSliderSchema), asyncHandler(sliderController.create));
router.patch('/:id', rbac('slider:update'), validate(updateSliderSchema), asyncHandler(sliderController.update));
router.delete('/:id', rbac('slider:delete'), asyncHandler(sliderController.remove));

router.post(
  '/:id/slides/reorder',
  rbac('slider:update'),
  validate(reorderSlidesSchema),
  asyncHandler(sliderController.reorderSlides),
);
router.post(
  '/:id/slides',
  rbac('slider:create'),
  validate(createSlideSchema),
  asyncHandler(sliderController.addSlide),
);
router.patch(
  '/:id/slides/:slideId',
  rbac('slider:update'),
  validate(updateSlideSchema),
  asyncHandler(sliderController.updateSlide),
);
router.delete('/:id/slides/:slideId', rbac('slider:delete'), asyncHandler(sliderController.removeSlide));

export default router;
