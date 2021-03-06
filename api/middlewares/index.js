require('dotenv').config();
import { Router } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

const middlewares = Router();

middlewares.use(cookieParser());
middlewares.use(bodyParser.json());

middlewares.use(passport.initialize());
middlewares.use(passport.session());

middlewares.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_COOKIE_SECRET],
    maxAge: 60 * 1000,
  })
);

export default middlewares;
