/*
 * Package Import
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * Local Import
 */
const configDev = require('./config/webpack.config.dev');
const configProd = require('./config/webpack.config.prod');

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
      plugins: () => [
        autoprefixer({
          browsers: ['last 2 versions', 'ie > 8'],
        }),
      ],
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

    // Rules / Loaders
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['eslint-loader'],
        },
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
