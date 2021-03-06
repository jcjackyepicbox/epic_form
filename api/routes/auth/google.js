import { Router } from 'express';
import passport from 'passport';

const googleAuthRouter = Router();
const FALLBACK_URL = 'http://localhost:3000/dashboard';

googleAuthRouter.get('/', (req, ...rest) => {
  let url = FALLBACK_URL;
  if (typeof req.query.r === 'string' && isSpectrumUrl(req.query.r)) {
    url = req.query.r;
  }

  req.session.redirectUrl = url;

  return passport.authenticate('google', {
    scope: 'profile email',
  })(req, ...rest);
});

googleAuthRouter.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/join',
  }),
  (req, res) => {
    const redirectUrl = req.session.redirectUrl
      ? new URL(req.session.redirectUrl)
      : new URL(FALLBACK_URL);
    redirectUrl.searchParams.append('authed', 'true');

    req.session.redirectUrl = undefined;
    res.redirect(redirectUrl.href);
  }
);

export default googleAuthRouter;
