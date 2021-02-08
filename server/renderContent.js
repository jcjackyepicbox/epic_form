const { renderToString } = require('react-dom/server');
const React = require('react');
const fs = require('fs');

function renderContent(App, pathHTML) {
  const appContent = renderToString(
    <div id="app">
      <App />
    </div>
  );

  const htmlContent = fs.readFileSync(pathHTML, 'utf8');
  const finalContent = htmlContent.replace('<div id="app"></div>', appContent);

  return finalContent;
}

module.exports = {
  renderContent,
};
