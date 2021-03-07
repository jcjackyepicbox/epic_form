require('dotenv').config();

import compression from 'compression';
import helmet from 'helmet';
import { fetchDataByRoute } from './utils/fetchData';
import createAppStore from '../redux/store';
import {
  renderContentLoadable,
  renderReduxState,
} from './renderer/renderContent';
import express from 'express';
import initAuthentication from './api/authentication';
import middlewares from './api/middlewares';
import authRouter from './api/routes/auth/index';
import apiRouter from './api/routes/api';
import App from '../src/_app';

export const app = express();

app.set('view engine', 'ejs');
app.set('trust proxy', 1); // trust first proxy

initAuthentication();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(middlewares);

app.use(express.static('build'));

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.get('*', async (req, res) => {
  const store = createAppStore();
  await fetchDataByRoute(req, res, store.dispatch);

  const context = {};
  const { html, linkTags, scriptTags, styleTags } = renderContentLoadable(
    App,
    context,
    req.url,
    store
  );

  const finalState = store.getState();
  const reduxScriptTag = renderReduxState(finalState);
  res.render('../public/index', {
    styleTag: styleTags,
    linkTag: linkTags,
    bodyHTML: html,
    scriptTag: scriptTags,
    reduxTag: reduxScriptTag,
  });

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });

    res.end();
  }
});
