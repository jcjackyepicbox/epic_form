import { renderContent } from './renderContent';

const express = require('express');

export const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  import('../src/pages/main/app.js').then(({ default: App }) => {
    const context = {};
    const finalContent = renderContent(
      App,
      'build/public/index.html',
      context,
      req.url
    );

    if (context.url) {
      res.writeHead(301, {
        Location: context.url,
      });

      res.end();
    }

    res.send(finalContent);
  });
});
