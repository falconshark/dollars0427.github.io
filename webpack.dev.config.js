const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: ['react-hot-loader/patch', './src/entry.jsx'],
  output: {
    path: path.resolve(__dirname, './libs'),
    publicPath: '/libs',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
  externals: {  // 指定采用外部 CDN 依赖的资源，不被webpack打包
    'avg-core': 'AVG',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
  ],
  devServer: {
    contentBase: './',
    historyApiFallback: {
      rewrites: [
      { from: /^\/libs\/index\.min\.js$/, to: '/libs/index.js' },
      { from: /^\/libs\/index\.min\.js.map$/, to: '/libs/index.js.map' },
      { from: /^\/libs\/pixi\.min\.js$/, to: '/node_modules/pixi.js/dist/pixi.js' },
      { from: /^\/libs\/avg\.min.js$/, to: '/node_modules/avg-core/dist/avg.js' },
      ]
    },
    host: '127.0.0.1',
    port: 6600,
    hot: true,
    // inline: true,
    // progress: true,
    /* uncomment it to load assets from your cdn */
    // proxy: {
    //   '/assets/': {
    //     target: '<your cdn domain>',
    //     secure: false
    //   }
    // }
  },
};
