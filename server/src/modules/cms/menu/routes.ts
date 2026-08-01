import { Router } from 'express';
import { menuController } from './controller';
import { authenticate } from '../../../middlewares/auth';
import { orgScope } from '../../../middlewares/orgScope';
import { rbac } from '../../../middlewares/rbac';
import { validate } from '../../../middlewares/validate';
import { asyncHandler } from '../../../utils/asyncHandler';
import {
  createMenuItemSchema,
  createMenuSchema,
  reorderMenuItemsSchema,
  updateMenuItemSchema,
  updateMenuSchema,
} from './schema';

const router = Router();

router.use(authenticate(), orgScope());

router.get('/', rbac('menu:view'), asyncHandler(menuController.list));
router.get('/:id', rbac('menu:view'), asyncHandler(menuController.getById));
router.post('/', rbac('menu:create'), validate(createMenuSchema), asyncHandler(menuController.create));
router.patch('/:id', rbac('menu:update'), validate(updateMenuSchema), asyncHandler(menuController.update));
router.delete('/:id', rbac('menu:delete'), asyncHandler(menuController.remove));

router.post(
  '/:id/items/reorder',
  rbac('menu:update'),
  validate(reorderMenuItemsSchema),
  asyncHandler(menuController.reorderItems),
);
router.post(
  '/:id/items',
  rbac('menu:create'),
  validate(createMenuItemSchema),
  asyncHandler(menuController.addItem),
);
router.patch(
  '/:id/items/:itemId',
  rbac('menu:update'),
  validate(updateMenuItemSchema),
  asyncHandler(menuController.updateItem),
);
router.delete('/:id/items/:itemId', rbac('menu:delete'), asyncHandler(menuController.removeItem));

export default router;
