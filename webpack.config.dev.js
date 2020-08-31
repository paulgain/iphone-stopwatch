const autoprefixer = require('autoprefixer');
const { merge } = require('webpack-merge');
const base = require('./webpack.config.base.js');
const localIdentName = require('./scope.name');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                compileType: 'module',
                localIdentName
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            },
          },
          'sass-loader',
        ],
      },
    ]
  }
});
