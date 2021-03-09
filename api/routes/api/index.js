import { Router } from 'express';
import { ensureLoggedIn } from '../../middlewares/ensureLogged';
import userRouter from './user.route';

const apiRouter = Router();

apiRouter.use(ensureLoggedIn());
apiRouter.use('/user', userRouter);

export default apiRouter;
