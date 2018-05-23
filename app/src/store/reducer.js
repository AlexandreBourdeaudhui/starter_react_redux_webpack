/*
 * Package Import
 */
import { combineReducers } from 'redux';

/*
 * Local Import
 */
import app from 'src/store/ducks/app';

/*
 * Combine ...Reducers
 */
const reducer = combineReducers({ app });

/*
 * Export
 */
export default reducer;
