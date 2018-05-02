/*
 * Package Import
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJS = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * Local Import
 */

/*
 * Webpack Configuration
 */
const config = {
  // Mode
  mode: 'production',

  // Entry
  entry: {
    app: ['./app/styles/index.scss', './app/src/index.js'],
  },

  // Output
  output: {
    path: path.resolve('./dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    publicPath: '/',
  },

  // Plugins
  plugins: [
    // Generates an `index.html` file with the <script> injected
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: './app/assets/index.html',
      minify: {
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk.css',
    }),

    new UglifyJS({
      uglifyOptions: {
        compress: { warnings: false },
        output: { comments: false },
      },
      sourceMap: false,
    }),

    new ManifestPlugin(),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false,
    }),
  ],

  // Devtool controls if and how sourcemaps are generated
  devtool: 'source-map',
};

/*
 * Export
 */
module.exports = config;
