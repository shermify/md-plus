
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const config = {
  devtool: 'source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: '/public',
    publicPath: '/',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
        include: [path.resolve(__dirname, 'src/styles'), path.resolve(__dirname, '../../node_modules/react-datetime/css')],
      },
      {
        test: /\.(jpg)$/,
        use: 'file-loader?name=assets/images/[name].[ext]',
        include: path.resolve(__dirname, 'src/images'),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({ debug: true }),
    new HtmlWebpackPlugin({ inject: true, template: './public/index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        IS_BROWSER: JSON.stringify('true'), // default value if not specified
      },
    }),

  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};

module.exports = config;
