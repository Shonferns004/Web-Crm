import { Router } from 'express';
import { siteController } from './controller';
import { asyncHandler } from '../../../utils/asyncHandler';

const router = Router();

router.get('/:slug', asyncHandler(siteController.getSite));

export default router;
