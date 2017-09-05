import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import 'react-datetime/css/react-datetime.css';
import DatePicker from './DatePicker';
import DropDownList from './DropDownList';

function getDefaultDate() {
  const dat = new Date(Date.now());
  dat.setDate(dat.getDate() + 30);
  return dat;
}

const AppointmentForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label htmlFor="scheduledOn" className="col-3 col-form-label">Date</label>
        <div className="col-9">
          <Field className="form-control" name="scheduledOn" component={DatePicker} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="purpose" className="col-3 col-form-label">Purpose</label>
        <div className="input-group col-9">
          <Field className="form-control" name="purpose" component="input" type="text" required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="doctor" className="col-3 col-form-label">Doctor</label>
        <Field
          name="doctor"
          component={DropDownList}
          items={props.doctors}
          className="form-control"
        >
          {/* {people.map(DropDownSelect)} */}
        </Field>
      </div>
      <Button
        bsStyle="primary"
        bsSize="large"
        type="submit"
      >
      Submit
      </Button>
    </form>
  );
};

AppointmentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  doctors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  })),
};
AppointmentForm.defaultProps = {
  doctors: [],
};

export default reduxForm({
  form: 'appointmentForm',
  initialValues: {
    scheduledOn: getDefaultDate(),
    status: 'Pending',
  },
})(AppointmentForm);
