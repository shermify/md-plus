import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';

const AppointmentForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} style={{ width: '300px' }}>
      <div className="form-group row">
        <label htmlFor="comment" className="col-3 col-form-label">Reason for decline</label>
        <div className="col-9">
          <Field className="form-control" name="comment" component="textarea" required />
        </div>
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
};

export default reduxForm({
  form: 'declineForm',
  initialValues: {
    status: 'Declined',
  },
})(AppointmentForm);
