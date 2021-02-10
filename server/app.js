const { renderContentLoadable } = require('./renderContent');
const path = require('path');
const express = require('express');
const ejs = require('ejs');

export const app = express();

app.use(express.static('build'));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  import('../src/pages/main/app.js').then(({ default: App }) => {
    const context = {};
    const { html, linkTags, scriptTags, styleTags } = renderContentLoadable(
      App,
      context,
      req.url
    );

    res.render('../public/index', {
      styleTag: styleTags,
      linkTag: linkTags,
      bodyHTML: html,
      scriptTag: scriptTags,
    });

    if (context.url) {
      res.writeHead(301, {
        Location: context.url,
      });

      res.end();
    }
  });
});
