/*
 * Package Import
 */
import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';

/*
 * Local Import
 */

/*
 * Code
 */
export default (store, Component) => (
  <Provider store={store}>
    <Router>
      <AppContainer>
        <Component />
      </AppContainer>
    </Router>
  </Provider>
);
