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
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.sass$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }, {
          loader: 'postcss-loader',
          options: { plugins: () => [ require('autoprefixer') ] }
        },
        'sass-loader'
      ],
    }, {
      test: /\.(jpg|png|gif)$/,
      use: 'url-loader?limit=8192',
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9.]*)?$/,
      use: 'file-loader',
    }, {
      test: /\.json$/,
      use: 'json-loader',
    }],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.jsx', '.sass'],
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      API_BASE: `'${process.env.API_BASE || '/api'}'`,
    }),
    new CopyWebpackPlugin([
      { from: 'src/static' },
    ]),
  ],
};
