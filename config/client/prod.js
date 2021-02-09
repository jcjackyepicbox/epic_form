const path = require('path');
const { merge } = require('webpack-merge');
const webpackCommon = require('./common');
const loaders = require('./loaders');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBarPlugin = require('webpackbar');

const webpackProd = {
  entry: path.resolve(__dirname, '../../src/pages/main/index.jsx'),
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../../build'),
    publicPath: '/',
  },
  plugins: [new WebpackBarPlugin({ name: 'Client' })],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Gathered from CRA webpack config
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimize: true,
    minimizer: [
      // This is only used in production mode
      // Gathered from CRA webpack config
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        sourceMap: false,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
};

module.exports = merge(
  webpackProd,
  webpackCommon,
  loaders.loadFiles({
    options: {
      name: 'static/media/[name].[ext]',
    },
  }),
  loaders.extractCSS({
    filename: 'static/css/[name].[contenthash:8].css',
  }),
  loaders.loadJavaScript()
  // loaders.loadPreESLint()
);
