import { Router } from 'express';
import userController from '../../controllers/user.controller';

const userRouter = Router();

// for user settings
userRouter.get('/workspace', userController.getUserData);

export default userRouter;
