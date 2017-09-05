import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import Auth from '../modules/Auth';

const Navbar = () => {
  const role = Auth.getRole();
  const id = Auth.getId();
  return (
    <nav className="navbar navbar-default" style={id ? { display: 'block' } : { display: 'none' }}>
      <div className="container">
        <Link
          className="navbar-brand"
          style={{ fontSize: '30px' }}
          to={role === 'Doctor' ? '/patients' : `/patients/${id}`}
        >
        MD+ Medical Records
      </Link>
        <p className="navbar-text navbar-right">
          <LogoutButton />
        </p>
      </div>
    </nav>);
};

export default Navbar;
