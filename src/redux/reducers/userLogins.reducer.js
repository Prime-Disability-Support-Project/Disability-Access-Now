import { combineReducers } from 'redux';

// All users that haven't been approved
const allPendingUsers = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_PENDING_USERS":
      return action.payload;
    default:
      return state;
  }
};

// All users who have been approved
const allApprovedUsers = (state = [], action) => {
    switch (action.type) {
      case "SET_ALL_APPROVED_USERS":
        return action.payload;
      default:
        return state;
    }
  };


export default combineReducers({
    allPendingUsers,
    allApprovedUsers,
  });
