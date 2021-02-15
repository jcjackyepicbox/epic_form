import compression from 'compression';
import helmet from 'helmet';
import { fetchDataByRoute } from './fetchData';
import createAppStore from '../redux/store';
import { renderContentLoadable, renderReduxState } from './renderContent';
import express from 'express';

export const app = express();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.static('build'));
app.set('view engine', 'ejs');

app.get('*', async (req, res) => {
  const fetchData: any = await fetchDataByRoute(req.path);
  const { data } = fetchData;
  const store = createAppStore({ todo: { todo: data } });
  import('../src/pages/main/app').then(({ default: App }) => {
    const context: any = {};
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
});
