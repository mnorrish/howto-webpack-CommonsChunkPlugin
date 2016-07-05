const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');

module.exports = Object.assign({}, config, {

  plugins: [
    // move shared dependencies into the entry chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'entry',
      children: true,
      minChunks: 2,
    }),

    // inject entry script into HTML file
    new HtmlWebpackPlugin({
      title: 'webpack with CommonsChunkPlugin',
      template: 'index.ejs',
    }),
  ],

});
