import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { fetchDataByRoute } from './utils/fetchData';
import createAppStore from '../redux/store';
import {
  renderContentLoadable,
  renderReduxState,
} from './renderer/renderContent';
import express from 'express';
import App from '../src/_app';

export const app = express();

app.set('view engine', 'ejs');

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cookieParser());

app.use(express.static('build'));

app.use((req, _, next) => {
  console.log('COOKIES', req.url, req.headers, req.cookies);
  next();
});

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
});
