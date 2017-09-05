import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PatientList from './PatientList';
import { loadPatientList } from '../actions/index';

class Patients extends React.Component {
  componentWillMount() {
    this.props.loadPatientList();
  }

  render() {
    const { filtered } = this.props;
    return (<PatientList patients={filtered} />);
  }
}

Patients.propTypes = {
  loadPatientList: PropTypes.func.isRequired,
  filtered: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  })),
};
Patients.defaultProps = {
  filtered: [],
};

const mapDispatchToProps = dispatch => bindActionCreators({ loadPatientList }, dispatch);

const mapStateToProps = state => ({
  ...state.patients,
});
export default connect(mapStateToProps, mapDispatchToProps)(Patients);
