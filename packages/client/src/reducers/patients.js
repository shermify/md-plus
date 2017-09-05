const initialState = {
  error: null,
  isPending: false,
  response: [],
  filtered: [],
};

export default function apiReducer(state = initialState, { filter, type, payload }) {
  switch (type) {
    case 'PATIENTS_FETCH_PENDING':
      return { ...state,
        isPending: true,
      };
    case 'PATIENTS_FETCH_SUCCESS':
      return { ...state,
        error: null,
        isPending: false,
        response: payload,
        filtered: payload,
      };
    case 'PATIENTS_FETCH_FAILURE':
      return { ...state,
        error: payload,
        isPending: false,
      };
    case 'PATIENTS_FILTER':
      return { ...state,
        error: null,
        isPending: false,
        filtered: state.response.filter(el =>
          el.firstName.toLowerCase().includes(filter) ||
          el.lastName.toLowerCase().includes(filter)),
      };
    default:
      return state;
  }
}
