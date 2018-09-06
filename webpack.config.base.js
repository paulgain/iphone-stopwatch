const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const generateScopedName = require('./scope.name');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: './website/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            plugins: [
              'transform-object-rest-spread',
              'transform-react-jsx',
              [
                'react-css-modules', {
                  generateScopedName,
                  filetypes: {
                    '.scss': {
                      syntax: 'postcss-scss'
                    }
                  }
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              path: path.resolve(__dirname, 'dist')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './website/index.html'
    })
  ]
};
