const webpack = require('webpack');
const config = require('./webpack.base.config');

config.entry.unshift(
  'webpack-dev-server/client', // ?http://0.0.0.0:8080
  'webpack/hot/only-dev-server'
);
config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin()
);
module.exports = config;
