require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
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
const morgan = require('morgan');
const middleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const clientWebpackConfig = require('../config/client/dev');
const { app } = require('../server/app');

const server = express();
const port = 3000;
const compiler = webpack(clientWebpackConfig);
process.env.NODE_ENV = 'development';

server.use(
  middleware(compiler, {
    serverSideRender: true,
  })
);

server.use(morgan('tiny'));

server.use(
  webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 4000,
  })
);

server.use((req, res) => {
  app(req, res);
});

server.listen(port, () => {
  console.log(`Example App listening at http://localhost:${port}`);
});
