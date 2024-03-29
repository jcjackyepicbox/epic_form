import { Router } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

const middlewares = Router();

middlewares.use(cookieParser());
middlewares.use(
  bodyParser.json({
    extended: true,
  })
);
middlewares.use(bodyParser.urlencoded({ extended: true }));

middlewares.use(
  cookieSession({
    name: '__session',
    keys: [process.env.SESSION_COOKIE_SECRET],
    maxAge: 604800000,
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  })
);

middlewares.use(passport.initialize());
middlewares.use(passport.session());

export default middlewares;
