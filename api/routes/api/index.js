import { Router } from 'express';
import { ensureLoggedIn } from '../../middlewares/ensureLogged';
import formRouter from './form.route';
import userRouter from './user.route';
import publicRouter from './public.route';

const apiRouter = Router();

apiRouter.use('/public', publicRouter);
apiRouter.use(ensureLoggedIn());
apiRouter.use('/user', userRouter);
apiRouter.use('/form', formRouter);

export default apiRouter;
