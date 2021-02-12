const { matchPath } = require('react-router-dom');
const { default: routes } = require('../src/routes');
const { default: createAppStore } = require('../redux/store');
const { renderContentLoadable, renderReduxState } = require('./renderContent');
const express = require('express');
export const app = express();

app.use(express.static('build'));
app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  let promises;
  routes.some((route) => {
    const match = matchPath(req.path, route);
    if (match) promises = () => route.loadData(match);
    return match;
  });

  if (promises && typeof promises === 'function') {
    promises().then((fetchData) => {
      const { data } = fetchData;
      const store = createAppStore({ todo: data });
      import('../src/pages/main/app.js').then(({ default: App }) => {
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
    });
  }
});
