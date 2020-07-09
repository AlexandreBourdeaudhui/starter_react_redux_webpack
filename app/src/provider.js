/*
 * Package Import
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

/*
 * Local Import
 */
import App from 'src/components/App';

/*
 * Code
 */
export default store => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
