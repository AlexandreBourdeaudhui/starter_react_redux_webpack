/*
 * Package Import
 */
import '@babel/polyfill';
import { render } from 'react-dom';

/*
 * Local Import
 */
import App from 'src/containers/App';
import store from 'src/store';
import getProvider from './provider';

/*
 * Code
 */
document.addEventListener('DOMContentLoaded', () => {
  const renderComponent = (Component) => {
    // Get provider
    const provider = getProvider(store, Component);

    // Init App
    render(provider, document.getElementById('root'));
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
