const path = require('path');
const webpack = require('webpack');
const clientFolder = path.join(__dirname, 'client');

module.exports = {
  mode: "production",
  entry: {
    bundle: ['webpack-hot-middleware/client',
      path.join(clientFolder, 'index.js')],
  },
  module: {
    rules: [
      {
        test: clientFolder,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [
            'transform-class-properties',
            'transform-es2015-classes',
            'react-hot-loader/babel'
          ],
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/javascripts'),
    publicPath: '/javascripts/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, "node_modules"),
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
};
