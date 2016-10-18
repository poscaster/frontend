const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.sass$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', 'postcss', 'sass'],
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'url-loader?limit=8192',
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9.]*)?$/,
      loader: 'file-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.jsx', '.sass'],
  },
  target: 'web',
  postcss: function() {
    return [ require('autoprefixer') ];
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE: `'${process.env.API_BASE || '/api'}'`,
    }),
    new CopyWebpackPlugin([
      { from: 'src/static' },
    ]),
  ],
};
