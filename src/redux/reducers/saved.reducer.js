import { combineReducers } from 'redux';

const savedArticles = (state = [], action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return action.payload;
    default:
      return state;
  }
};

const savedFiles = (state = [], action) => {
  switch (action.type) {
    case "SET_FILES":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
    savedArticles,
    savedFiles,
  });