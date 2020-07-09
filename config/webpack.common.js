/*
 * Package Import
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * Local Import
 */
const configDev = require('./webpack.dev');
const configProd = require('./webpack.prod');

/*
 * Utils
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/*
 * Css Loaders
 */
const cssLoaders = [
  {
    loader: 'css-loader',
    options: { importLoaders: 1, sourceMap: true },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [require('autoprefixer')],
    },
  },
];

/*
 * Webpack Config
 */
const config = Object.assign(
  {
    // Resolve
    resolve: {
      // Where Webpack is need to seeing / resolving files.
      modules: ['node_modules', path.resolve('./app')],
      extensions: ['.js', '.jsx', '.json'],
    },

    optimization: {
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: "all"
        // `name` is disabled because it's causing a blanck page
        // name: false
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true
    },

    // Rules / Loaders
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              /*
               * This is a feature of `babel-loader` for webpack,
               * Not Babel itself.
               *
               * It enables caching results in
               * [./node_modules/.cache/babel-loader/] directory
               * For faster rebuilds.
               *
               * https://github.com/babel/babel-loader#options
               */
              cacheDirectory: isDevelopment,
            },
          },
        },
        {
          test: /\.s?[ac]ss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            ...cssLoaders,
            'sass-loader',
          ],
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
                // 8kb
                limit: 8192,
                name: '[name].[hash].[ext]',
              },
            },
          ],
        },
      ],
    },
  },
  isDevelopment ? configDev : configProd,
);

/*
 * Export
 */
module.exports = config;
