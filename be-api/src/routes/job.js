import { Router } from 'express';

import * as jobController from '@/controllers/job';
import { isAuthenticated, validate, authorization } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, jobController.getJobs)

router.route('/filter')
  .get(isAuthenticated, jobController.getJobsFilter)

router.route('/:id')
    .get(isAuthenticated, jobController.getJobById)


export default router;
