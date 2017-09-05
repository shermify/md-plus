import { API_ACTION_TYPE } from 'redux-rest-api';
import Auth from '../modules/Auth';

/**
 * loads a list of patients
 * @param  {ObjectId} id patient id
 * @return {Object}    redux action
 */
export function loadPatientList() {
  return {
    [API_ACTION_TYPE]: {
      types: ['PATIENTS_FETCH_PENDING', 'PATIENTS_FETCH_SUCCESS', 'PATIENTS_FETCH_FAILURE'],
      endpoint: 'http://localhost:3000/api/patients',
      fetchOptions: {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      },
    },
  };
}
/**
 * loads a list of patients
 * @param  {ObjectId} id patient id
 * @return {Object}    redux action
 */
export function filterPatientList(filter) {
  return {
    type: 'PATIENTS_FILTER',
    filter,
  };
}
/**
 * loads details for patient
 * @param  {ObjectId} id patient id
 * @return {Object}    redux action
 */
export function loadPatient(id) {
  return {
    [API_ACTION_TYPE]: {
      types: ['PATIENT_FETCH_PENDING', 'PATIENT_FETCH_SUCCESS', 'PATIENT_FETCH_FAILURE'],
      endpoint: `http://localhost:3000/api/patients/${id}`,
      fetchOptions: {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      },
    },
  };
}

export function loadAppointments(id) {
  return {
    [API_ACTION_TYPE]: {
      types: ['APPT_FETCH_PENDING', 'APPT_FETCH_SUCCESS', 'APPT_FETCH_FAILURE'],
      endpoint: `http://localhost:3000/api/patients/${id}/appointments`,
      fetchOptions: {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      },
    },
  };
}


export function loadDoctors() {
  return {
    [API_ACTION_TYPE]: {
      types: ['DOCTORS_FETCH_PENDING', 'DOCTORS_FETCH_SUCCESS', 'DOCTORS_FETCH_FAILURE'],
      endpoint: 'http://localhost:3000/api/doctors',
      fetchOptions: {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      },
    },
  };
}
