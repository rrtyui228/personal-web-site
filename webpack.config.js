const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dist/bundle.js',
  },
  resolve: { extensions: ['.js', '.jsx', '.scss'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
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
        test: /\.(sa|sc|c)ss$/, // styles files
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
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
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
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};
