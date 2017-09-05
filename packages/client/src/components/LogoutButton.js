import React from 'react';
import Auth from '../modules/Auth';

const logout = () => {
  Auth.deauthenticateUser();
  window.location = '/login';
};

const LogoutButton = () =>
  <button onClick={logout} className="btn-link navbar-link" style={{ position: 'absolute' }}>
    Logout
  </button>;

export default LogoutButton;
