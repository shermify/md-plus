import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppointmentList from './AppointmentList';
import { loadPatient, loadAppointments, loadDoctors } from '../actions/index';
import { updateAppointment } from '../actions/forms';

const getVisibleAppointments = (appts, filter) => {
  if (appts === null) { return []; }
  switch (filter) {
    case 'SHOW_PENDING':
      return appts.filter(a => a.status === 'Pending');
    case 'SHOW_UPCOMING':
      return appts.filter(a => !a.completed && a.status === 'Approved' && Date.parse(a.scheduledOn) >= Date.now());
    case 'SHOW_HISTORY':
      return appts.filter(a => a.completed || Date.parse(a.scheduledOn) < Date.now());
    default:
      return appts.filter(a => a.status);
  }
};

const mapStateToProps = state => ({
  appointments: getVisibleAppointments(state.appointments.response, state.appointmentFilter),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPatient, loadAppointments, loadDoctors, updateAppointment }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentList);
