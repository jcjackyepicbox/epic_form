import { Router } from 'express';
import googleAuthRouter from './google';

const authRouter = Router();

authRouter.use('/google', googleAuthRouter);
export default authRouter;
