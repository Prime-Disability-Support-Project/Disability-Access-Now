import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import userQuestions from './userQuestions.reducer';
import adminQuestions from './adminQuestions.reducer';
import saved from './saved.reducer';
import articles from './articles.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  userQuestions, // contains logged in user's unanswered and answered questions
  adminQuestions, // contains all users unanswered and answered questions
  saved, // contains all saved articles and files
  articles, // contains all articles and specific articles
});

export default rootReducer;
