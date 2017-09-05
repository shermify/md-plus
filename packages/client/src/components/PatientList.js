import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const PatientList = ({ patients }) => (
  <div className="container-fluid mt">
    <div className="row">
      <div className="col">
        <div className="container patient-list">
          <h2>Please select a patient</h2>
          <SearchBar />
          <ul className="list-group">
            <FlipMove enterAnimation="accordionVertical">
              {patients.map(patient => (
                <Link
                  key={patient._id}
                  className="list-group-item list-group-item-action"
                  to={`/patients/${patient._id}`}
                >{`${patient.lastName}, ${patient.firstName}`}
                </Link>
              ))}
            </FlipMove>
          </ul>
        </div>
      </div>
    </div>
  </div>);

PatientList.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  })),
};
PatientList.defaultProps = {
  patients: [],
};

export default PatientList;
