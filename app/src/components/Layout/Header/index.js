/*
 * Package Import
 */
import React from 'react';
import { Link } from 'react-router-dom';

/*
 * Local Import
 */
import './style.scss';

/*
 * Component
 */
const Header = () => (
  <header>
    <Link to={'/'}>Home</Link>
  </header>
);

/*
 * Export
 */
export default Header;
