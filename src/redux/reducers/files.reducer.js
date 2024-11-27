import { combineReducers } from "redux";

const allFiles = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_FILES":
      return action.payload;
    default:
      return state;
  }
};

const specificFile = (state = [], action) => {
  switch (action.type) {
    case "SET_SPECIFIC_FILE":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  allFiles,
  specificFile,
});
