/*
 * Local Import
 */

/*
 * Types
 */
const GET_DATA = 'GET_DATA';

/*
 * Middleware
 */
export default store => next => (action) => {
  switch (action.type) {
    /*
     * If the desired action has been triggered,
     * We can get the state, dispatch an action, ajax...
     */
    case GET_DATA:
      // eslint-disable-next-line no-console
      console.log('store', store);
      break;

    /*
     * If the triggered action does not interest us,
     * We do nothing
     */
    default:
  }

  // Pass to your neighbor
  next(action);
};

/*
 * Actions Creators
 */
export const getData = () => ({
  type: GET_DATA,
});
