require('dotenv').config();
import middlewares from './middlewares';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth/index';
import apiRouter from './routes/api/index';
import { MongoClient } from 'mongodb';
import userDao from './dao/userDao';
import initAuthentication from './authentication';
import formDao from './dao/formDao';
import settingDao from './dao/settingDao';

const app = express();

app.set('trust proxy', 1); // trust first proxy

initAuthentication();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

app.use(middlewares);

app.use((req, res, next) => {
  console.log('Cookies', req.url, req.cookies);
  console.log('Headers', req.url, req.headers);

  next();
});

app.use('/auth', authRouter);
app.use('/api', apiRouter);

function initMongo() {
  return MongoClient.connect(process.env.EPICFORM_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 50,
  })
    .catch((err) => {
      console.error('Mongo client', err.stack);
      process.exit(1);
    })
    .then(async (client) => {
      await userDao.injectDB(client);
      await formDao.injectDB(client);
      await settingDao.injectDB(client);
      return;
    });
}

initMongo().then(() => {
  app.listen(3001, () => {
    console.log(`API Server listening at http://localhost:${3001}`);
  });
});
