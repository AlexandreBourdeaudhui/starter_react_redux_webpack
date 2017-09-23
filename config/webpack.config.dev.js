/*
 * Package Import
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


/*
 * Local Import
 */


/*
 * Webpack Config
 */
const config = {
  // Entry Point.
  entry: {
    app: [
      'react-hot-loader/patch',
      './app/style/index.scss',
      './app/src/index.js',
    ],
  },

  // Output Point
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  // Resolve
  resolve: {
    // Where is Webpack need to see / resolve file.
    modules: ['node_modules', path.resolve('app')],
  },

  // Rules / Loaders
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: { importLoaders: 1, minimize: false },
          },
        }),
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1, minimize: false },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192, name: '[name].[hash].[ext]' },
          },
        ],
      },
    ],
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/assets/index.html',
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true,
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  // Options watch
  watch: true,

  // devtool controls if and how source maps are generated.
  devtool: 'cheap-module-eval-source-map',

  // Settings devServer.
  devServer: {
    contentBase: path.resolve('./app/assets'),
    hot: true,
    overlay: true,
    port: 3000,
    stats: 'minimal',
    watchOptions: {
      ignored: /node_modules/,
    },
  },
};


/*
 * Export
 */
module.exports = config;
