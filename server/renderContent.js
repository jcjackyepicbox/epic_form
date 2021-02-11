const { renderToString } = require('react-dom/server');
const React = require('react');
const { StaticRouter } = require('react-router-dom');
const fs = require('fs');
const { ChunkExtractor } = require('@loadable/server');
const path = require('path');
const { Provider } = require('react-redux');

function renderContent(App, pathHTML, context, location) {
  const appContent = renderToString(
    <div id="app">
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </div>
  );

  const htmlContent = fs.readFileSync(pathHTML, 'utf8');
  const finalContent = htmlContent.replace('<div id="app"></div>', appContent);

  return finalContent;
}

function renderContentLoadable(App, context, location, store) {
  let webStats = path.resolve(__dirname, '../build/loadable-stats.json');

  if (process.env.NODE_ENV === 'development') {
    webStats = path.resolve(__dirname, '../dev/stats.json');
  }
  const extractor = new ChunkExtractor({ statsFile: webStats });
  const jsx = extractor.collectChunks(
    <div id="app">
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </div>
  );

  const html = renderToString(jsx);
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  return {
    html,
    scriptTags,
    linkTags,
    styleTags,
  };
}

function renderReduxState(preloadedState) {
  return `<script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // https://redux.js.org/recipes/server-rendering/#security-considerations
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\u003c'
    )}
  </script>`;
}

module.exports = {
  renderContent,
  renderContentLoadable,
  renderReduxState,
};
