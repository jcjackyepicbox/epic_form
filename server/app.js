const { fetchDataByRoute } = require('./fetchData');

const { default: createAppStore } = require('../redux/store');
const { renderContentLoadable, renderReduxState } = require('./renderContent');
const express = require('express');
export const app = express();

app.use(express.static('build'));
app.set('view engine', 'ejs');

app.get('*', async (req, res) => {
  const fetchData = await fetchDataByRoute(req);
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
