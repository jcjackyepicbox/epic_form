import { Router } from 'express';
import passport from 'passport';
import { signToken } from '../../../shared/jwt';

const googleAuthRouter = Router();
const FALLBACK_URL = 'http://localhost:3000/dashboard';

googleAuthRouter.get('/', (req, ...rest) => {
  return passport.authenticate('google', {
    scope: 'profile email',
  })(req, ...rest);
});

googleAuthRouter.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/join',
  }),
  signToken(process.env.SESSION_COOKIE_SECRET),
  (req, res) => {
    res.redirect(`${FALLBACK_URL}/${req.user.workspaces[0]._id}`);
  }
);

export default googleAuthRouter;
