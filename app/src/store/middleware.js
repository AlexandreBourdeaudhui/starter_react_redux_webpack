/*
 * Package Import
 */


/*
 * Local Import
 */


/*
 * Code
 */
const createMiddleware = store => next => (action) => {
  console.log(store);

  switch (action.type) {
    /*
     * Default
     */
    default:
  }

  next(action);
};


/*
 * Export default
 */
export default createMiddleware;
