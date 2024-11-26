import { combineReducers } from 'redux';

const userUnanswered = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_UNANSWERED":
      return action.payload;
    default:
      return state;
  }
};

const userAnswered = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_ANSWERED":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
    userUnanswered,
    userAnswered,
  });