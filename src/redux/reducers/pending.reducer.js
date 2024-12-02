const pendingReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_NAV':
        return action.payload;
      case 'CLEAR_NAV':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default pendingReducer;
  