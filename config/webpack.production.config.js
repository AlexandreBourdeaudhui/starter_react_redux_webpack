/*
 * Package Import
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJS = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
    options: { importLoaders: 1, minimize: true },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        autoprefixer({
          browsers: ['last 2 versions', 'ie > 8'],
        }),
      ],
    },
  },
];

const config = {
  // Mode
  mode: 'production',

  // Entry point.
  entry: {
    app: ['./app/style/index.scss', './app/src/index.js'],
  },

  // Output point.
  output: {
    path: path.resolve('./dist'),
    filename: 'js/[name].[chunkhash].js',
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
        use: ['babel-loader'],
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
            options: {
              limit: 8192,
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  // Plugins.
  plugins: [
    // Generates an `index.html` file with the <script> injected.
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

    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      disable: false,
    }),

    new UglifyJS({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false,
    }),

    new ManifestPlugin(),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false,
    }),
  ],
};

/*
 * Export
 */
module.exports = config;
