import { renderContent } from './renderContent';

const express = require('express');

export const app = express();

app.get('/', (req, res) => {
  import('../src/pages/main/app.js').then(({ default: App }) => {
    const finalContent = renderContent(App, 'build/index.html');
    res.send(finalContent);
  });
});

app.use(express.static('build'));
