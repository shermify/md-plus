import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datetime';
import moment from 'moment';

// import 'react-datetime/css/react-datetime.css';

class renderDatePicker extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.object.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.bool,
    }),
  }

  static defaultProps = {
    placeholder: '',
    meta: {
      touched: false,
      error: false,
    },
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.input.onChange(moment(date));
  }

  render() {
    const {
      input,
      meta: { touched, error },
    } = this.props;

    return (
      <div style={{ width: '300px', zIndex: 100 }}>
        <DatePicker

          {...input}
          selected={input.value ? moment(input.value) : null}
          onChange={this.handleChange}
        />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
}

export default renderDatePicker;
