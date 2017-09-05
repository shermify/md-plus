import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import AppointmentForm from '../components/AppointmentForm';
import Modal from '../components/Modal';
import { createAppointment } from '../actions/forms';

class AppointmentFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  // functions to open and close the modal form
  // TODO refactor to use redux
  closeModal = () => this.setState({ open: false });
  openModal = () => this.setState({ open: true });

  handleSubmit = (form) => {
    const { patientId, reload } = this.props;
    this.props.createAppointment(patientId, form).then(() => {
      this.setState({ open: false });
      reload(patientId);
    });
  }

  render() {
    return (
      <div className="container">
        <Button
          bsStyle="primary"
          onClick={this.openModal}
        >
          <span className="glyphicon glyphicon-plus-sign" aria-hidden="true" /> Create New Appointment
      </Button>
        <Modal
          open={this.state.open}
          close={this.closeModal}
          heading="Schedule an Appointment"
        >
          <AppointmentForm onSubmit={this.handleSubmit} doctors={this.props.doctors} />
        </Modal>
      </div>);
  }
}

AppointmentFormContainer.propTypes = {
  createAppointment: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
  doctors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  })),
};

AppointmentFormContainer.defaultProps = {
  doctors: [],
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createAppointment }, dispatch);

const mapStateToProps = state => ({
  ...{ patientId: state.patient.response._id, doctors: state.doctors.response },
});
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentFormContainer);
