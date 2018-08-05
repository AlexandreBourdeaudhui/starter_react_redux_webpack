/*
 * Package Import
 */
const path = require('path');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/*
 * Local Import
 */

/*
 * Webpack Configuration • Production
 */
const config = {
  // Mode
  mode: 'production',

  // Entry
  entry: {
    app: ['./app/styles/base.scss', './app/src/index.js'],
  },

  // Output
  output: {
    path: path.resolve('./dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    publicPath: '/',
  },

  optimization: {
    // Optimization › Split the App and vendor files
    splitChunks: {
      chunks: 'all',
    },

    minimizer: [
      // Uglify JS files
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),

      //  Minify CSS Files
      new OptimizeCSSAssetsPlugin({}),
    ],
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

    // CSS
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk.css',
    }),

    // Generate a `manifest.json` for the index.html
    // With JS and CSS link, generate with a hash
    new ManifestPlugin(),

    // Clear the `dist` folder
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
