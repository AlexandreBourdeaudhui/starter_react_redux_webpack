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
