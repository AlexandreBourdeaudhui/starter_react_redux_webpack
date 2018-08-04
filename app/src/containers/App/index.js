/*
 * Package Import
 */
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/*
 * Local Import
 */
import App from 'src/components/App';

/*
 * Code
 */

// State
const mapStateToProps = null;

// Actions
const mapDispatchToProps = {};

/*
 * Export
 */
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
