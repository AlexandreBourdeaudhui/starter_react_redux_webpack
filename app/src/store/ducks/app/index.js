/*
 * Types
 */
const SET_DATA = 'SET_DATA';

/*
 * Initial State
 */
const initialState = {};

/*
 * Reducer
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    /*
     * Data
     */
    case SET_DATA:
      return {
        ...state,
        ...action.data,
      };

    // If action is not found, just return the state
    default:
      return state;
  }
};

/*
 * Actions Creators
 */
export const setData = data => ({
  type: SET_DATA,
  data,
});

/*
 * Selectors
 */
