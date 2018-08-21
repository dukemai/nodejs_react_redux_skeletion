const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

module.exports = {
  devtool: 'source-map',

  mode: 'development',
  entry: {
    bundle: ['webpack-hot-middleware/client', './client/index.js'],
  },
  ...baseConfig,
  plugins: [...baseConfig.plugins, new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
      },
    ],
  },
};
