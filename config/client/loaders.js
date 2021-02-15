const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

exports.extractCSS = ({ options = {}, filename = '[name].css' } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options },
            {
              loader: 'css-loader',
            },
          ],
          // If you distribute your code as a package and want to
          // use _Tree Shaking_, then you should mark CSS extraction
          // to emit side effects. For most use cases, you don't
          // have to worry about setting flag.
          sideEffects: true,
        },
      ],
    },
    plugins: [
      /**
       * Using MiniCssExtractPlugin with styling solves the problem of Flash of Unstyled Content (FOUC).
       * Separating CSS from JavaScript also improves caching behavior and removes a potential attack vector.
       */
      new MiniCssExtractPlugin({
        filename,
      }),
    ],
  };
};

exports.loadFiles = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|md|svg)$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: [
          path.join(__dirname, '../../src'),
          path.join(__dirname, '../../redux'),
        ],
        use: 'babel-loader',
      },
    ],
  },
});

exports.loadPreESLint = () => ({
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              cache: true,
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.join(__dirname, '..', '..', 'src'),
      },
    ],
  },
});
