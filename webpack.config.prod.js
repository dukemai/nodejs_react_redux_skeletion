const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  mode: 'production',
  entry: {
    bundle: ['./client/index.js'],
  },
  ...baseConfig,
  plugins: [new ExtractTextPlugin({ filename: '../stylesheets/[name].min.css' }), ...baseConfig.plugins],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [require('autoprefixer')],
              },
            },
            'stylus-loader',
          ],
        }),
      },
    ],
  },
};
