require('dotenv').config();
import { Router } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import bodyParser from 'body-parser';

const middlewares = Router();

middlewares.use(cookieParser());
middlewares.use(bodyParser.json());

middlewares.use(
  expressSession({
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

middlewares.use(passport.initialize());
middlewares.use(passport.session());

export default middlewares;
