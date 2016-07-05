const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  context: path.resolve('source'),

  entry: {
    entry: './app.js'
  },

  output: {
    path: path.resolve('dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js'
  },

  module: {
    preLoaders: [
      // run ESLint on JavaScript files
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      // compile JavaScript ES2015 files with Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  plugins: [
    // inject entry script into HTML file
    new HtmlWebpackPlugin({
      title: 'webpack base',
      template: 'index.ejs'
    })
  ],

  devtool: 'sourcemap'

};
