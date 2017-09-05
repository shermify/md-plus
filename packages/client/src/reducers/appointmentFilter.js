const appointmentFilter = (state = 'SHOW_PENDING', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default appointmentFilter;
