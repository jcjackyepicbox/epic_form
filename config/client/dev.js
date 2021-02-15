const { default: LoadablePlugin } = require('@loadable/webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackCommon = require('./common');
const loaders = require('./loaders');

const webpackDev = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    path.resolve(__dirname, '../../src/pages/main/index.tsx'),
  ],
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '..', '..', 'dev'),
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 3000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin({ filename: 'stats.json', writeToDisk: true }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '..', '..', 'dev', 'dev.html'),
    //   filename: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   },
    // }),
  ],
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
