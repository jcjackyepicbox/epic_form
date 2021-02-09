const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, '../../src/pages/main/index.jsx'),
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', '..', 'public', 'index.html'),
      favicon: path.resolve(__dirname, '..', '..', 'public', 'favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
