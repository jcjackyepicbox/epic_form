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
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const clientWebpackConfig = require('../config/client/dev');

const server = express();
const port = 3000;
const compiler = webpack(clientWebpackConfig);

server.use(
  middleware(compiler, {
    serverSideRender: true,
  })
);

server.use(
  webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 4000,
  })
);

server.use((req, res) => {
  const { app } = require('../server/app');
  app(req, res);
});

server.listen(port, () => {
  console.log(`Example App listening at http://localhost:${port}`);
});
