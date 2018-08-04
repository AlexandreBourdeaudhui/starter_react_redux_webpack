/*
 * Package Import
 */
var path = require('path');
var JSDOM = require('jsdom').JSDOM;

// Enzyme
var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

// Babel
var babelRegister = require('babel-core/register');

/*
 * Babel
 */
babelRegister();

/*
 * Enzyme
 */
Enzyme.configure({ adapter: new Adapter() });

/*
 * Global stuff
 */
var exposedProperties = ['window', 'navigator', 'document'];
var js = new JSDOM('', { url: 'http://localhost/' });
global.window = js.window;
global.document = js.window.document;
global.HTMLElement = js.window.HTMLElement;
global.navigator = {
  userAgent: 'node.js',
};
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

// Ignore scss files
require.extensions['.scss'] = () => {
  return;
};
