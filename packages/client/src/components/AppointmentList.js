import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import Appointment from './Appointment';
import DeclineForm from '../components/DeclineForm';
import Modal from '../components/Modal';

// TODO refactor to container and presentation components
class AppointmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  componentWillMount() {
    const { id, loadAppointments, loadDoctors } = this.props;
    loadDoctors();
    loadAppointments(id);
  }

  accept = (appointment) => {
    const { id, loadAppointments, updateAppointment } = this.props;
    updateAppointment({ ...appointment, status: 'Approved' })
      .then(() => loadAppointments(id));
  };
  decline = (form) => {
    const { id, loadAppointments, updateAppointment } = this.props;
    updateAppointment({ ...form, _id: this.state.id })
      .then(() => {
        this.setState({ open: false });
        loadAppointments(id);
      });
  };
  close = () => this.setState({ open: false });
  open = id => this.setState({ open: true, id });

  render() {
    const { appointments } = this.props;
    return (
      <div className="container">
        <ul className="list-group">
          <FlipMove enterAnimation="accordionVertical" easing="ease-out">
            {appointments.map(appt => (
              <Appointment
                key={appt._id}
                appt={appt}
                accept={this.accept}
                decline={this.open}
              />))}
          </FlipMove>
        </ul>
        <Modal
          open={this.state.open}
          close={this.close}
          heading="Decline Appointment"
        >
          <DeclineForm onSubmit={this.decline} />
        </Modal>
      </div>);
  }
}

AppointmentList.propTypes = {
  loadAppointments: PropTypes.func.isRequired,
  loadDoctors: PropTypes.func.isRequired,
  updateAppointment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.shape({
    scheduledOn: PropTypes.string,
    purpose: PropTypes.string,
  })).isRequired,
};

export default AppointmentList;
