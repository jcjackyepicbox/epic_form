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
process.env.NODE_ENV = 'development';

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

// server.use((req, res) => {
//   const { devMiddleware } = res.locals.webpack;
//   const outputFileSystem = devMiddleware.outputFileSystem;
//   const jsonWebpackStats = devMiddleware.stats.toJson();
//   const { assetsByChunkName, outputPath } = jsonWebpackStats;

//   // Then use `assetsByChunkName` for server-side rendering
//   // For example, if you have only one main chunk:
//   res.send(`
// <html>
//   <head>
//     <title>My App</title>
//     <style>
//     ${normalizeAssets(assetsByChunkName.main)
//       .filter((path) => path.endsWith('.css'))
//       .map((path) =>
//         outputFileSystem.readFileSync(pathe.join(outputPath, path))
//       )
//       .join('\n')}
//     </style>
//   </head>
//   <body>
//     <div id="app"></div>
//     ${normalizeAssets(assetsByChunkName.main)
//       .filter((path) => path.endsWith('.js'))
//       .map((path) => `<script src="${path}"></script>`)
//       .join('\n')}
//   </body>
// </html>
//   `);
// });

server.listen(port, () => {
  console.log(`Example App listening at http://localhost:${port}`);
});
