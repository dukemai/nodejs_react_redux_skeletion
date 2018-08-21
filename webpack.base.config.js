const webpack = require('webpack');
const path = require('path');

const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV || 'development',
  }),
];

const clientFolder = path.join(__dirname, 'client');

const output = {
  filename: '[name].js',
  path: `${__dirname}/public/javascripts/`,
  publicPath: '/javascripts/',
};

const optimization = {
  namedModules: true,
  noEmitOnErrors: true,
  splitChunks: {
    cacheGroups: {
      vendor: {
        chunks: 'initial',
        test: path.resolve(__dirname, 'node_modules'),
        name: 'vendor',
        enforce: true,
      },
    },
  },
};

const modules = {
  rules: [
    {
      test: clientFolder,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        plugins: ['transform-class-properties', 'transform-es2015-classes', 'react-hot-loader/babel'],
      },
    },
    { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.svg$/,
      exclude: /node_modules\/.*/,
      loader: 'svg-inline-loader',
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    },
  ],
};

module.exports = {
  plugins,
  output,
  module: modules,
  optimization,
};
