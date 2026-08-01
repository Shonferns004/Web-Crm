import { Router } from 'express';
import { authenticate } from '../../../middlewares/auth';
import { orgScope } from '../../../middlewares/orgScope';
import { rbac } from '../../../middlewares/rbac';
import { validate } from '../../../middlewares/validate';
import { paginate } from '../../../middlewares/paginate';
import { projectController } from './controller';
import { projectSchema, projectUpdateSchema } from './schema';

const router = Router();

router.use(authenticate(), orgScope());

router.get('/', rbac('project:view'), paginate(), projectController.list);
router.get('/:id', rbac('project:view'), projectController.getById);
router.post('/', rbac('project:create'), validate(projectSchema), projectController.create);
router.patch('/:id', rbac('project:update'), validate(projectUpdateSchema), projectController.update);
router.delete('/:id', rbac('project:delete'), projectController.remove);

export default router;
