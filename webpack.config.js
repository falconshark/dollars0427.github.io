const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/entry.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/libs'),
    publicPath: '/dist/libs',
    filename: 'index.min.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
  externals: {
    'avg-core': 'AVG',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
        NODE_ENV: JSON.stringify("production"),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/pixi.js/dist/pixi.min.js', to: 'pixi.min.js' },
      { from: 'node_modules/avg-core/dist/avg.min.js', to: 'avg.min.js' },
    ])
  ]
};
