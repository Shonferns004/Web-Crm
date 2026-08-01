import { Router } from 'express';
import { donationController } from './controller';
import { authenticate } from '../../middlewares/auth';
import { orgScope } from '../../middlewares/orgScope';
import { rbac } from '../../middlewares/rbac';
import { validate } from '../../middlewares/validate';
import { donationLimiter } from '../../middlewares/rateLimiter';
import { asyncHandler } from '../../utils/asyncHandler';
import { createDonationSchema } from './schema';

const router = Router();

router.get('/', authenticate(), orgScope(), rbac('donation:view'), ...donationController.list);
router.post(
  '/',
  donationLimiter,
  authenticate(),
  orgScope(),
  rbac('donation:create'),
  validate(createDonationSchema),
  asyncHandler(donationController.create),
);

export default router;
