/*
 * Package Import
 */
import { applyMiddleware, compose, createStore } from 'redux';

/*
 * Local Import
 */
import reducer from './reducer';
import ajax from './middlewares/ajax';

/*
 * Redux DevTools extension
 */
let devTools = [];

if (process.env.NODE_ENV !== 'production') {
  if (window.devToolsExtension) {
    devTools = [window.devToolsExtension()];
  }
}

/*
 * ...Middlewares
 */
const allMiddlewares = applyMiddleware(ajax);
const allMiddlewaresCompose = compose(allMiddlewares, ...devTools);

// Store
const store = createStore(reducer, allMiddlewaresCompose);

/*
 * Export
 */
export default store;
