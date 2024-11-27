import { combineReducers } from "redux";

const allArticles = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_ARTICLES":
      return action.payload;
    default:
      return state;
  }
};

const specificArticle = (state = [], action) => {
  switch (action.type) {
    case "SET_SPECIFIC_ARTICLE":
      return action.payload;
    case "RESET_SPECIFIC_ARTICLE":
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  allArticles,
  specificArticle,
});
