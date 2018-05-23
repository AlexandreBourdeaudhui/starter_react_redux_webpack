/*
 * Types
 */
const SET_DATAS = 'SET_DATAS';

/*
 * Initial State
 */
const initialState = {};

/*
 * Reducer
 */
export default (prevState = initialState, action = {}) => {
  switch (action.type) {
    /*
     * Datas
     */
    case SET_DATAS:
      return {
        ...prevState,
        ...action.datas,
      };

    // If no action is found, Just return the actual state
    default:
      return prevState;
  }
};

/*
 * Actions Creators
 */
export const setDatas = datas => ({
  type: SET_DATAS,
  datas,
});

/*
 * Selectors
 */
