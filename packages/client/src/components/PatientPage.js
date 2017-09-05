import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PatientDetail from './PatientDetail';
import { loadPatient, loadAppointments } from '../actions/index';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPatient, loadAppointments }, dispatch);

const mapStateToProps = state => ({
  ...{ patient: state.patient.response },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientDetail);
