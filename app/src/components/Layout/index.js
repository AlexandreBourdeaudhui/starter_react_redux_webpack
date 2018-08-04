/*
 * Package Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/*
 * Local Import
 */
import Header from './Header';
import Footer from './Footer';

/*
 * Component
 */
const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

/*
 * PropTypes
 */
Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

/*
 * Export
 */
export default Layout;
