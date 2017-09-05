import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Auth from '../modules/Auth';

const large = {
  fontSize: 'large',
  fontWeight: 'bolder',
};
const bold = {
  fontWeight: 'bolder',
};

// class required for flipmove
class Appointment extends React.Component { // eslint-disable-line
  render() {
    const { accept, decline, appt } = this.props;
    const role = Auth.getRole();
    return (
      <div>
        <li className="list-group-item">
          <div style={large}>{moment(appt.scheduledOn).format('MMMM Do YYYY, h:mm:ss a')}<br /></div>
          <div style={bold}>{`Dr. ${appt.doctor.firstName} ${appt.doctor.lastName}`}</div>
          <div>{`Purpose: ${appt.purpose}`}</div>
          <br />
          {appt.status === 'Pending' && role === 'Doctor' &&
            <div className="btn-group" role="group" aria-label="...">
              <button type="button" className="btn btn-success" onClick={() => accept(appt)}>
                <span className="glyphicon glyphicon-ok" aria-hidden="true" /> Accept</button>
              <button type="button" className="btn btn-danger" onClick={() => decline(appt._id)}>
                <span className="glyphicon glyphicon-ban-circle" aria-hidden="true" /> Decline</button>
            </div>}
          {appt.status === 'Declined' &&
          <div>
            <div style={{ color: 'red' }}>Declined</div>
            <div>{`Reason: ${appt.comment}`}</div>
          </div>}
          {appt.status === 'Pending' && role === 'Patient' && <i className="text-warning">Pending Approval</i>}

        </li>
      </div>
    );
  }
}

Appointment.propTypes = {
  accept: PropTypes.func.isRequired,
  decline: PropTypes.func.isRequired,
  appt: PropTypes.shape({
    scheduledOn: PropTypes.string,
    purpose: PropTypes.string,
  }).isRequired,
};


export default Appointment;
