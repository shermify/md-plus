import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Auth from '../modules/Auth';

const LoginForm = (props) => {
  const { handleSubmit, onSubmit, pristine, submitting, submitSucceeded } = props;

  if (submitSucceeded && Auth.isUserAuthenticated()) {
    const role = Auth.getRole();
    const id = Auth.getId();
    return role === 'Doctor' ? <Redirect to="/" /> : <Redirect to={`/patients/${id}`} />;
  }

  return (
    <div className="cover">
      <form className="container login-form" onSubmit={handleSubmit(values => onSubmit(values))}>
        <div style={{ fontSize: 'x-large', textAlign: 'center' }}>Please sign in</div>
        <div className="form-group row">
          <label htmlFor="email" className="col-3 col-form-label">Email</label>
          <div className="col-3">
            <Field className="form-control" name="email" component="input" type="text" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-3 col-form-label">password</label>
          <div className="col-3">
            <Field className="form-control" name="password" component="input" type="text" />
          </div>
        </div>
        <div
          className="alert alert-danger"
          role="alert"
          style={{ display: submitSucceeded && props.loginError ? 'block' : 'none' }}
        >Incorrect Email or Password</div>
        <button type="submit" className="btn btn-primary btn-lg" disabled={pristine || submitting}>Submit</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  loginError: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'loginForm',
})(LoginForm);
