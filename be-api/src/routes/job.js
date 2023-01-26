import { Router } from 'express';

import * as jobController from '@/controllers/job';
import { isAuthenticated, validate, authorization } from '@/middleware';

const router = Router();

router.route('/')
  .get(jobController.getJobs)

router.route('/filter')
  .get(jobController.getJobsFilter)

router.route('/:id')
    .get(jobController.getJobById)


export default router;
