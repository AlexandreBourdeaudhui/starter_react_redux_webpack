/*
 * Package Import
 */
import { render } from 'react-dom';

/*
 * Local Import
 */
import store from 'src/store';
import getProvider from './provider';

/*
 * Code
 */
const provider = getProvider(store);
const node = document.getElementById('root');

/*
 * Render
 */
document.addEventListener('DOMContentLoaded', () => {
  render(provider, node);
});
