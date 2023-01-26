import authRouter from '@/routes/auth';
import indexRouter from '@/routes/index';
import jobRouter from '@/routes/job';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/jobs', jobRouter);
}
