const webpack = require('webpack');
const config = require('./webpack.base.config');

config.devtool = 'source-map';
config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
);
config.eslint = { failOnError: true };

module.exports = config;
