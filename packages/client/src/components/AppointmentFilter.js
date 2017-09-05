import React from 'react';
import FilterButton from './FilterButton';

const AppointmentFilter = () =>
  <div className="container">
    <ul className="nav nav-tabs">
      <FilterButton filter="SHOW_PENDING">
            Pending Appointments
          </FilterButton>
      <FilterButton filter="SHOW_UPCOMING">
            Upcoming Appointments
          </FilterButton>
      <FilterButton filter="SHOW_HISTORY">
             Appointment History
          </FilterButton>
    </ul>
  </div>;

export default AppointmentFilter;
