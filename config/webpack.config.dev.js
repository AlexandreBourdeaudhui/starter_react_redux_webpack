/*
 * Package Import
 */
const path = require('path');

// Webpack core
const webpack = require('webpack');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * Local Import
 */

/*
 * Webpack Configuration • Development
 */
const config = {
  // Mode
  mode: 'development',

  // Entry
  entry: {
    app: ['./app/styles/base.scss', './app/src/index.js'],
  },

  // Output
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },

  // Optimization › Split the App and vendor files
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/assets/index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    // HMR
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  // Devtool controls if and how sourcemaps are generated
  devtool: 'cheap-module-eval-source-map',

  // If we need to reload automagically during the dev
  watch: true,

  // Settings devServer
  devServer: {
    // Enable gzip compression of generated files
    compress: true,
    contentBase: path.resolve('./dist'),

    // Active HMR
    hot: true,

    // Fix the problem with React-Router (Cannot get /route when we refresh)
    historyApiFallback: true,

    // Open the Nav when we start the devServer
    open: false,

    // Display an overlay in your browser when you got an error
    overlay: true,

    // Build progress in console
    progress: true,
    port: 3000,

    // What do you need display in your console?
    // https://webpack.js.org/configuration/stats/#stats
    stats: {
      colors: true,
      modules: false,
      timings: true,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  },
};

/*
 * Export
 */
module.exports = config;
