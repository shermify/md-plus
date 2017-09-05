import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterPatientList } from '../actions/index';

const Search = props => (
  <div>
    <input type="text" onChange={e => props.filterPatientList(e.target.value)} className="form-control" placeholder="Search" />
  </div>
  );

Search.propTypes = {
  filterPatientList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ filterPatientList }, dispatch);

const mapStateToProps = state => ({
  ...state.patients,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
