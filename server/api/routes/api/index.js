import { Router } from 'express';
import { ensureLoggedIn } from '../../middlewares/ensureLogged';
import userRouter from './user';

const apiRouter = Router();

apiRouter.use(ensureLoggedIn(true, '/join'));

apiRouter.use('/user', userRouter);

export default apiRouter;
