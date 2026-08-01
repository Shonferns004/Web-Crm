import { Router } from 'express';
import { userController } from './controller';
import { authenticate } from '../../middlewares/auth';
import { rbac } from '../../middlewares/rbac';
import { validate } from '../../middlewares/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import { assignOrgSchema, createUserSchema, updateUserSchema } from './schema';

const router = Router();

router.get('/', authenticate(), rbac('user:view'), ...userController.list);
router.get('/:id', authenticate(), rbac('user:view'), asyncHandler(userController.getById));
router.post('/', authenticate(), rbac('user:create'), validate(createUserSchema), asyncHandler(userController.create));
router.patch('/:id', authenticate(), rbac('user:update'), validate(updateUserSchema), asyncHandler(userController.update));
router.delete('/:id', authenticate(), rbac('user:delete'), asyncHandler(userController.remove));
router.post(
  '/:id/assign-org',
  authenticate(),
  rbac('user:assign'),
  validate(assignOrgSchema),
  asyncHandler(userController.assignOrg),
);
router.delete(
  '/:id/orgs/:organizationId',
  authenticate(),
  rbac('user:assign'),
  asyncHandler(userController.removeFromOrg),
);
router.get('/:id/memberships', authenticate(), rbac('user:view'), asyncHandler(userController.memberships));

export default router;
