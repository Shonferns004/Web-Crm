import { Router } from 'express';
import { pageController } from './controller';
import { authenticate } from '../../../middlewares/auth';
import { orgScope } from '../../../middlewares/orgScope';
import { rbac } from '../../../middlewares/rbac';
import { validate } from '../../../middlewares/validate';
import { asyncHandler } from '../../../utils/asyncHandler';
import {
  createPageSchema,
  createSectionSchema,
  reorderSectionsSchema,
  updatePageSchema,
  updateSectionSchema,
} from './schema';

const router = Router();

router.use(authenticate(), orgScope());

router.get('/', rbac('page:view'), ...pageController.list);
router.get('/:id', rbac('page:view'), asyncHandler(pageController.getById));
router.post('/', rbac('page:create'), validate(createPageSchema), asyncHandler(pageController.create));
router.patch('/:id', rbac('page:update'), validate(updatePageSchema), asyncHandler(pageController.update));
router.delete('/:id', rbac('page:delete'), asyncHandler(pageController.remove));

router.post(
  '/:id/sections/reorder',
  rbac('section:update'),
  validate(reorderSectionsSchema),
  asyncHandler(pageController.reorderSections),
);
router.post(
  '/:id/sections',
  rbac('section:create'),
  validate(createSectionSchema),
  asyncHandler(pageController.addSection),
);
router.patch(
  '/:id/sections/:sectionId',
  rbac('section:update'),
  validate(updateSectionSchema),
  asyncHandler(pageController.updateSection),
);
router.delete(
  '/:id/sections/:sectionId',
  rbac('section:delete'),
  asyncHandler(pageController.removeSection),
);

export default router;
