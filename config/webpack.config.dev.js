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

// CSS Loader
const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap: true,
    },
  },
];

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
    extensions: ['.js', '.json', '.jsx'],
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
        use: {
          loader: 'babel-loader',
          options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders,
        }),
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...cssLoaders, 'sass-loader'],
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

    // HMR Css
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  // If you need to reload auto during the dev
  watch: true,

  // devtool controls if and how source maps are generated.
  devtool: 'cheap-module-eval-source-map',

  // Settings devServer.
  devServer: {
    // Enable gzip compression of generated files.
    // compress: true,
    contentBase: path.resolve('./app/assets'),

    // Active HMR
    hot: true,

    // Display an overlay in your browser when you got an error
    overlay: true,
    port: 3000,

    // What do you need display in your console?
    // "errors-only" | "minimal" \ "none" | "normal" | "detailed" | "verbose"
    // https://webpack.js.org/configuration/stats/#stats
    stats: {
      errors: true,
      modules: false,
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
