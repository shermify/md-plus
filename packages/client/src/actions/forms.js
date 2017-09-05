import { API_ACTION_TYPE } from 'redux-rest-api';
import Auth from '../modules/Auth';

export function createAppointment(id, form) {
  return {
    [API_ACTION_TYPE]: {
      types: ['CREATE_APPT_PENDING', 'CREATE_APPT_SUCCESS', 'CREATE_APPT_FAILURE'],
      endpoint: `http://localhost:3000/api/patients/${id}/appointments`,
      fetchOptions: {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(form),
      },
    },
  };
}

export function updateAppointment(appointment) {
  return {
    [API_ACTION_TYPE]: {
      types: ['UPDATE_APPT_PENDING', 'UPDATE_APPT_SUCCESS', 'UPDATE_APPT_FAILURE'],
      endpoint: `http://localhost:3000/api/appointments/${appointment._id}`,
      fetchOptions: {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(appointment),
      },
    },
  };
}
