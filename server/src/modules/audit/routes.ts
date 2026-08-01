import { Router } from 'express';
import { auditController } from './controller';
import { authenticate } from '../../middlewares/auth';
import { orgScope } from '../../middlewares/orgScope';
import { rbac } from '../../middlewares/rbac';

const router = Router();

router.get('/', authenticate(), orgScope(false), rbac('audit:view'), ...auditController.list);

export default router;
