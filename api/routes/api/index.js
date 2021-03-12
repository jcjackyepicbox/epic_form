import { Router } from 'express';
import { ensureLoggedIn } from '../../middlewares/ensureLogged';
import formRouter from './form.route';
import userRouter from './user.route';

const apiRouter = Router();

apiRouter.use(ensureLoggedIn());
apiRouter.use('/user', userRouter);
apiRouter.use('/form', formRouter);

export default apiRouter;
