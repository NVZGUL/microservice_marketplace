import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">React SSR</Link>
      </div>
    </nav>
  );
};

export default Header;
