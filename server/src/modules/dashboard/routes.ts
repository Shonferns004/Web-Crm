import { Router } from 'express';
import { dashboardController } from './controller';
import { authenticate } from '../../middlewares/auth';
import { orgScope } from '../../middlewares/orgScope';
import { rbac } from '../../middlewares/rbac';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.use(authenticate(), rbac('dashboard:view'));

router.get('/overview', asyncHandler(dashboardController.overview));
router.get('/websites', asyncHandler(dashboardController.websites));
router.get('/websites/:id', asyncHandler(dashboardController.siteById));
router.get('/my-website', orgScope(), asyncHandler(dashboardController.myWebsite));

export default router;
