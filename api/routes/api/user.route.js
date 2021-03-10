import { Router } from 'express';
import userController from '../../controllers/user.controller';

const userRouter = Router();

// for user settings
userRouter.get('/workspace', userController.getUserData);
userRouter.post('/workspace', userController.insertNewWorkspace);
userRouter.put('/workspace', userController.updateTitleWorkspace);
userRouter.delete('/workspace', userController.removeWorkspace);

export default userRouter;
