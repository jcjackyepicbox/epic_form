import { Router } from 'express';
import { ensureLoggedOut } from '../../middlewares/ensureLogged';
import googleAuthRouter from './google';

const authRouter = Router();

authRouter.use(ensureLoggedOut());
authRouter.use('/google', googleAuthRouter);
export default authRouter;
