/*
 * Package Import
 */
const path = require('path');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/*
 * Local Import
 */

/*
 * Code
 */
const isAnalyze = process.argv.includes("--analyze") || process.argv.includes("--analyse");

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
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want uglify-js to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        // @todo add flag for sourcemaps
        sourceMap: true
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
     new CleanWebpackPlugin({
      verbose: true
    }),

    // Webpack Bundle Analyzer
    // https://github.com/th0r/webpack-bundle-analyzer
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
  ],

  // Devtool controls if and how sourcemaps are generated
  devtool: 'source-map',

  // Stop compilation early in production
  bail: true,
};

/*
 * Export
 */
module.exports = config;
