const webpack = require('webpack');

function compile(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }

      if (!stats.hasErrors()) {
        stats.toJson('errors-only').errors.forEach((e) => {
          reject(e);
        });
      }

      resolve();
    });
  });
}

module.exports = {
  compile,
};
