import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
import Patients from './Patients';
import PatientPage from './PatientPage';
import LoginPage from './LoginPage';
import Navbar from './Navbar';
import '../styles/main.scss';

const App = () =>
  <div style={{ minWidth: '430px' }}>
    <Navbar />
    <PrivateRoute path="/" exact allowed={['Doctor']} component={Patients} />
    <Route path="/login" component={LoginPage} />
    <PrivateRoute path="/patients" exact allowed={['Doctor']} component={Patients} />
    <PrivateRoute path="/patients/:id" allowed={['Doctor', 'Patient']} component={PatientPage} />
  </div>;

const PrivateRoute = ({ component: Component, allowed: roles, ...rest }) => (
  <Route
    {...rest} render={props => (
        Auth.isUserInRole(roles) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      )}
  />);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  allowed: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
