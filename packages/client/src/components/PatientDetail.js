import React from 'react';
import PropTypes from 'prop-types';
import AppointmentFormContainer from './AppointmentFormContainer';
import AppointmentFilter from './AppointmentFilter';
import AppointmentContainer from './AppointmentContainer';
import FileLibrary from './FileLibrary';

class PatientDetail extends React.Component {

  componentWillMount() {
    const { match, loadPatient } = this.props;
    loadPatient(match.params.id);
  }

  render() {
    const patient = this.props.patient;
    if (!patient || patient.length === 0) { return null; }
    return (
      <div className="container mt">
        <div>
          <div className="row">
            <div className="col-md-6">
              <div style={{ fontWeight: 'bold', fontSize: '40px' }}>{`${patient.firstName} ${patient.lastName}`}</div>
              <div style={{ fontWeight: 'bold', fontSize: '25px' }}>
                Gender: {patient.gender}<br />
                Age: {patient.age}</div>
              <h3>Contact Details</h3>
                  Phone: <a href={`tel:${patient.phone}`}>{patient.phone}</a><br />
                  Email: <a href={`mailto:${patient.email}`}>{patient.email}</a><br />
              {patient.address.street}<br />
              {`${patient.address.city}, ${patient.address.state} ${patient.address.zip}`}<br />
            </div>

            <div className="col-md-6">
              <FileLibrary />
            </div>
          </div>

          <div className="row">
            <br />
            <AppointmentFormContainer reload={this.props.loadAppointments} />
            <br />
            <AppointmentFilter />
            <AppointmentContainer id={patient._id} />
          </div>
        </div>
      </div>
    );
  }
}

PatientDetail.propTypes = {
  loadPatient: PropTypes.func.isRequired,
  loadAppointments: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    isPending: PropTypes.bool,
    purpose: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
PatientDetail.defaultProps = {
  patient: [],
};

export default PatientDetail;
