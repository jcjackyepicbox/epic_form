require('dotenv').config();

import express from 'express';
import compression from 'compression';
import initAuthentication from './authentication';
import authRouter from './routes/auth';
import middlewares from './middlewares';

const port = process.env.PORT || 3001;
const app = express();

app.set('trust proxy', 1); // trust first proxy

initAuthentication();

app.use(compression());
app.use(middlewares);

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  req.session.test = { test: 123 };
  return res.json({});
});

app.get('/check', (req, res) => {
  return res.json({ ...req.session.test, ...req.session.passport });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }

  if (__DEV__) {
    console.log('> in development');
  }

  console.log(`> listening on port ${port}`);
});
