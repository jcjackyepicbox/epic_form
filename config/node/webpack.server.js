const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { default: WebpackBarPlugin } = require('webpackbar');

module.exports = {
  target: 'node',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  node: {
    __dirname: true,
  },
  entry: './server/app.js',
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../build/server'),
    libraryTarget: 'commonjs2',
  },
  plugins: [new WebpackBarPlugin({ name: 'Server', color: 'yellow' })],
};
