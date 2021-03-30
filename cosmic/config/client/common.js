const path = require('path');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = () => {
  return {
    resolve: {
      extensions: ['.js', '.json', '.tsx', '.ts', '.jsx'],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  };
};
