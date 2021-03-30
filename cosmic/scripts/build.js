const clientWebpackConfig = require('../config/client/prod');
const serverWebpackConfig = require('../config/node/webpack.server');
const { compile } = require('./common');
const fs = require('fs');

function init() {
  if (fs.existsSync('build')) {
    fs.rmSync('build', { recursive: true });
  }

  compile([clientWebpackConfig, serverWebpackConfig])
    .then(() => {
      console.log('Success! Compiled in `build` folder');
    })
    .catch((err) => {
      console.error(err);
    });
}

init();
