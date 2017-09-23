/* eslint-disable */


/*
 * Load your config files within environment.
 * and launch Webpack.
 */
module.exports = function load() {
  return require(`./config/webpack.config.${process.env.NODE_ENV}.js`);
};
