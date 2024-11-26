import { combineReducers } from 'redux';

const adminUnanswered = (state = [], action) => {
  switch (action.type) {
    case "SET_ADMIN_UNANSWERED":
      return action.payload;
    default:
      return state;
  }
};

const adminAnswered = (state = [], action) => {
  switch (action.type) {
    case "SET_ADMIN_ANSWERED":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
    adminAnswered,
    adminUnanswered,
  });