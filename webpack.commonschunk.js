const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');

module.exports = Object.assign({}, config, {

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'entry',
            children: true,
            minChunks: 2
        }),

        new HtmlWebpackPlugin({
          title: 'webpack with CommonsChunkPlugin',
          template: 'index.ejs'
        })
    ]

});
