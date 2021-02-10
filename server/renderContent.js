const { renderToString } = require('react-dom/server');
const React = require('react');
const { StaticRouter } = require('react-router-dom');
const fs = require('fs');

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

module.exports = {
  renderContent,
};
