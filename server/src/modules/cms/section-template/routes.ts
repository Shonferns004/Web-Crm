import { Router } from 'express';
import { sectionTemplateController } from './controller';
import { authenticate } from '../../../middlewares/auth';
import { orgScope } from '../../../middlewares/orgScope';
import { rbac } from '../../../middlewares/rbac';
import { validate } from '../../../middlewares/validate';
import { asyncHandler } from '../../../utils/asyncHandler';
import { createSectionTemplateSchema, updateSectionTemplateSchema } from './schema';

const router = Router();

router.use(authenticate(), orgScope());

router.get('/templates', rbac('section:view'), asyncHandler(sectionTemplateController.list));
router.post(
  '/templates',
  rbac('section:create'),
  validate(createSectionTemplateSchema),
  asyncHandler(sectionTemplateController.create),
);
router.patch(
  '/templates/:id',
  rbac('section:update'),
  validate(updateSectionTemplateSchema),
  asyncHandler(sectionTemplateController.update),
);
router.delete('/templates/:id', rbac('section:delete'), asyncHandler(sectionTemplateController.remove));

export default router;
