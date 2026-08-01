import { Router } from 'express';
import { authenticate } from '../../../middlewares/auth';
import { orgScope } from '../../../middlewares/orgScope';
import { rbac } from '../../../middlewares/rbac';
import { validate } from '../../../middlewares/validate';
import { paginate } from '../../../middlewares/paginate';
import { galleryController } from './controller';
import { gallerySchema, galleryUpdateSchema } from './schema';

const router = Router();

router.use(authenticate(), orgScope());

router.get('/', rbac('gallery:view'), paginate(), galleryController.list);
router.get('/:id', rbac('gallery:view'), galleryController.getById);
router.post('/', rbac('gallery:create'), validate(gallerySchema), galleryController.create);
router.patch('/:id', rbac('gallery:update'), validate(galleryUpdateSchema), galleryController.update);
router.delete('/:id', rbac('gallery:delete'), galleryController.remove);

export default router;
