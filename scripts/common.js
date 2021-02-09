const webpack = require('webpack');

function compile(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
      // console.log(stats.hasErrors(), stats.toJson().errors);
      if (err) {
        reject(err);
      }

      if (stats.hasErrors()) {
        reject(stats.toJson().errors);
      }

      resolve();
    });
  });
}

module.exports = {
  compile,
};
