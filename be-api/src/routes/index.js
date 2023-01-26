import { Router } from 'express';

import * as indexController from '@/controllers/index';
import { isAuthenticated, validate, authorization } from '@/middleware';

const router = Router();

router.route('/')
  .get(indexController.getIndex)

export default router;