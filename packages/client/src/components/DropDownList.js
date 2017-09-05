import React from 'react';
import PropTypes from 'prop-types';

class DropDownList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  renderSelectOptions = item => (
    <option key={item._id} value={item._id}>{item.firstName} {item.lastName}</option>
  )

  render() {
    const { input, items } = this.props;
    return (
      <div>
        {/* <label htmlFor={label}>{label}</label> */}
        <select required {...input} >
          <option value="">None</option>
          {items ? items.map(this.renderSelectOptions) : null}
        </select>
      </div>
    );
  }
}

DropDownList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  })).isRequired,
  input: PropTypes.shape({ name: PropTypes.string, value: PropTypes.string }).isRequired,
};

export default DropDownList;
