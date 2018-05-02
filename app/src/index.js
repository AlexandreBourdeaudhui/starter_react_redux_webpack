/*
 * Package Import
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';

/*
 * Local Import
 */
import App from 'src/containers/App';
import store from 'src/store';

/*
 * Code
 */
document.addEventListener('DOMContentLoaded', () => {
  const renderComponent = (Component) => {
    render(
      <Provider store={store}>
        <Router>
          <AppContainer>
            <Component />
          </AppContainer>
        </Router>
      </Provider>,
      document.getElementById('root'),
    );
  };

  renderComponent(App);

  /*
   * Hot Module Replacement
   */
  if (module.hot) {
    module.hot.accept('src/containers/App', () => {
      renderComponent(App);
    });
  }
});
