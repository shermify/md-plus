const initialState = {
  sites: [],
};
export default(state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SITE':
      return {
        ...state,
        sites: [
          ...state.sites,
          {
            name: action.name,
          }],
      };
    case 'SELECT_PATIENT':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      },
    );
    default:
      return state;
  }
};
