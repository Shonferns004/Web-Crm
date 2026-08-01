import { Router } from 'express';
import { bannerController } from './controller';
import { authenticate } from '../../../middlewares/auth';
import { orgScope } from '../../../middlewares/orgScope';
import { rbac } from '../../../middlewares/rbac';
import { validate } from '../../../middlewares/validate';
import { asyncHandler } from '../../../utils/asyncHandler';
import { createBannerSchema, updateBannerSchema } from './schema';

const router = Router();

router.use(authenticate(), orgScope());

router.get('/', rbac('banner:view'), asyncHandler(bannerController.list));
router.post('/', rbac('banner:create'), validate(createBannerSchema), asyncHandler(bannerController.create));
router.patch('/:id', rbac('banner:update'), validate(updateBannerSchema), asyncHandler(bannerController.update));
router.delete('/:id', rbac('banner:delete'), asyncHandler(bannerController.remove));

export default router;
