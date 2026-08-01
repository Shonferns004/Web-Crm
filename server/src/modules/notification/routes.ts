import { Router } from 'express';
import { notificationController } from './controller';
import { authenticate } from '../../middlewares/auth';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', authenticate(), ...notificationController.list);
router.patch('/read-all', authenticate(), asyncHandler(notificationController.markAllRead));
router.patch('/:id/read', authenticate(), asyncHandler(notificationController.markRead));

export default router;
