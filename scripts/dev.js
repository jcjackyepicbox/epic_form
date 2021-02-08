require('@babel/register')({
  plugins: [
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
        generateScopedName: '[hash:base64]',
      },
    ],
    'dynamic-import-node',
  ],
});

const express = require('express');
const server = express();
const port = 3000;

server.use((req, res) => {
  const { app } = require('../server/app');
  app(req, res);
});

server.listen(port, () => {
  console.log(`Example App listening at http://localhost:${port}`);
});
