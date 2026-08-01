import { Router } from 'express';
import { settingsController } from './controller';
import { authenticate } from '../../middlewares/auth';
import { orgScope } from '../../middlewares/orgScope';
import { rbac } from '../../middlewares/rbac';
import { validate } from '../../middlewares/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import { updateSettingsSchema } from './schema';

const router = Router();

router.get('/', authenticate(), orgScope(), rbac('settings:view'), asyncHandler(settingsController.get));
router.put(
  '/',
  authenticate(),
  orgScope(),
  rbac('settings:update'),
  validate(updateSettingsSchema),
  asyncHandler(settingsController.update),
);

export default router;
