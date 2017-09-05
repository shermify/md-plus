import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setFilter from '../actions/appointmentFilter';

const Link = ({ active, children, onClick }) => (
  <li role="presentation" className={active ? 'active' : null}>
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  </li>
  );

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.appointmentFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setFilter(ownProps.filter));
  },
});

Link.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
Link.defaultProps = {
  active: false,
};


const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);

export default FilterLink;
