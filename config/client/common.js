const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (isDev) => {
  return {
    resolve: {
      extensions: ['.js', '.json', '.tsx', '.ts', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', '..', 'public', 'index.html'),
        favicon: path.resolve(__dirname, '..', '..', 'public', 'favicon.ico'),
        filename: isDev ? 'index.html' : 'public/index.html',
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
};
