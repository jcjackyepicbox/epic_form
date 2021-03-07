import { Router } from 'express';

const userRouter = Router();

userRouter.get('/getUser', (req, res) => {
  return res.json(JSON.parse(req.session.passport.user));
});

export default userRouter;
