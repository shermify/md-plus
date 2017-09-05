import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { API_ACTION_TYPE } from 'redux-rest-api';
import Auth from '../modules/Auth';
import LoginForm from './LoginForm';

const mapDispatchToProps = dispatch => ({
  onSubmit: form =>
    dispatch({
      [API_ACTION_TYPE]: {
        types: ['LOGIN_PENDING', 'LOGIN_SUCCESS', 'LOGIN_FAILURE'],
        endpoint: 'http://localhost:3000/auth/login',
        fetchOptions: {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(form),
        },
      },
    })
    .then((data) => {
      Auth.authenticateUser(data.token, data.user.id, data.user.role);
    })
    .catch(() => { }),

});

const mapStateToProps = state => ({
  ...{ loginError: state.login.error || false },
});

const LoginPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm));

export default LoginPage;
