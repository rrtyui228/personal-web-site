const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**  Project structure for this config
 *  --public
 *    --index.html
 *  --src
 *    --components
 *      --shared
 *        --index.js - export all shared from this file
 *      ...otherComponents
 *    --styles
 *      --variables.scss
 *    --utils
 *      --index.js - export all utils from this file
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const resolve = (resolvingPath) => path.resolve(__dirname, resolvingPath);

module.exports = {
  entry: resolve('src/index.jsx'),
  mode: isDevelopment ? 'development' : 'production',
  output: {
    path: resolve('dist'),
    filename: 'dist/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      shared: resolve('src/components/shared'),
      styles: resolve('src/styles'),
      utils: resolve('src/utils'),
    },
  },
  // TODO: check this warnings
  ignoreWarnings: [
    {
      module: /module2\.js\?[34]/,
    },
    {
      module: /[13]/,
      message: /homepage/,
    },
    /warning from compiler/,
    () => true,
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve('src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: { limit: false },
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
    }),
  ],
};
