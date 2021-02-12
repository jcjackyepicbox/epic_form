const { matchPath } = require('react-router-dom');
const { default: routes } = require('../src/routes');

const { default: createAppStore } = require('../redux/store');
const { renderContentLoadable, renderReduxState } = require('./renderContent');
const express = require('express');

export const app = express();

app.use(express.static('build'));
app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  const store = createAppStore({
    todo: ['abc', 'cde'],
  });

  const promises = [];
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  routes.some((route) => {
    // use `matchPath` here
    const match = matchPath(req.path, route);
    if (match) promises.push(route.loadData(match));
    return match;
  });

  Promise.all(promises).then((data) => {
    // do something w/ the data so the client
    // can access it then render the app
    console.log(data);
  });

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
