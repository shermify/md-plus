import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { apiMiddleware, configureApiReducer } from 'redux-rest-api';
import { reducer as formReducer } from 'redux-form';
import appointmentFilter from './reducers/appointmentFilter';
import fileUpload from './reducers/fileUpload';
import patientsReducer from './reducers/patients';
import Root from './components/App';

const store = createStore(
  combineReducers({
    fileUpload,
    appointmentFilter,
    form: formReducer,
    appointments: configureApiReducer({
      types: ['APPT_FETCH_PENDING', 'APPT_FETCH_SUCCESS', 'APPT_FETCH_FAILURE'],
    }),
    patient: configureApiReducer({
      types: ['PATIENT_FETCH_PENDING', 'PATIENT_FETCH_SUCCESS', 'PATIENT_FETCH_FAILURE'],
    }),
    doctors: configureApiReducer({
      types: ['DOCTORS_FETCH_PENDING', 'DOCTORS_FETCH_SUCCESS', 'DOCTORS_FETCH_FAILURE'],
    }),
    login: configureApiReducer({
      types: ['LOGIN_PENDING', 'LOGIN_SUCCESS', 'LOGIN_FAILURE'],
    }),
    // patients: configureApiReducer({
    //   types: ['PATIENTS_FETCH_PENDING', 'PATIENTS_FETCH_SUCCESS', 'PATIENTS_FETCH_FAILURE'],
    // }),
    patients: patientsReducer,
  }),
  applyMiddleware(thunk, logger, apiMiddleware),
);

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer>
          <Component />
        </AppContainer>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept();
}
