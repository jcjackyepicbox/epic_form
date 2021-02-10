const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackCommon = require('./common');
const loaders = require('./loaders');

const webpackDev = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    path.resolve(__dirname, '../../src/pages/main/index.jsx'),
  ],
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '..', '..', 'build'),
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 3000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(
  webpackDev,
  webpackCommon(true),
  loaders.extractCSS(),
  loaders.loadFiles({
    options: {
      name: '[name].[ext]',
    },
  }),
  loaders.loadJavaScript()
  // loaders.loadPreESLint()
);
