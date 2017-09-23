/*
 * Package Import
 */
import { applyMiddleware, compose, createStore } from 'redux';


/*
 * Local Import
 */
import reducer from './reducer';
import createMiddleware from './middleware';


/*
 * Code
 */

// Redux DevTools extension
let devTools = [];

if (process.env.NODE_ENV !== 'production') {
  if (window.devToolsExtension) {
    devTools = [window.devToolsExtension()];
  }
}

// Middleware
const middleware = applyMiddleware(createMiddleware);
const allMiddlewares = compose(middleware, ...devTools);

// Store
const store = createStore(reducer, allMiddlewares);

/*
 * Export
 */
export default store;
