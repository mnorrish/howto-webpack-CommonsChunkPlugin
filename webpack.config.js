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
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack base',
      template: 'index.ejs'
    })
  ],

  devtool: 'sourcemap'

};
