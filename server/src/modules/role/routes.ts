import { Router } from 'express';
import { roleController } from './controller';
import { authenticate } from '../../middlewares/auth';
import { rbac } from '../../middlewares/rbac';
import { validate } from '../../middlewares/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import { createRoleSchema, updateRoleSchema } from './schema';

const router = Router();

router.get('/permissions', authenticate(), rbac('role:view'), asyncHandler(roleController.listPermissions));
router.get('/', authenticate(), rbac('role:view'), asyncHandler(roleController.listRoles));
router.get('/:id', authenticate(), rbac('role:view'), asyncHandler(roleController.getById));
router.post('/', authenticate(), rbac('role:create'), validate(createRoleSchema), asyncHandler(roleController.create));
router.patch('/:id', authenticate(), rbac('role:update'), validate(updateRoleSchema), asyncHandler(roleController.update));
router.delete('/:id', authenticate(), rbac('role:delete'), asyncHandler(roleController.remove));

export default router;
