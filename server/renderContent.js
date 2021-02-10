const { renderToString } = require('react-dom/server');
const React = require('react');
const { StaticRouter } = require('react-router-dom');
const fs = require('fs');
const { ChunkExtractor } = require('@loadable/server');
const path = require('path');

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

function renderContentLoadable(App, context, location) {
  const webStats = path.resolve(__dirname, '../build/loadable-stats.json');

  const extractor = new ChunkExtractor({ statsFile: webStats });

  const jsx = extractor.collectChunks(
    <div id="app">
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
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

module.exports = {
  renderContent,
  renderContentLoadable,
};
