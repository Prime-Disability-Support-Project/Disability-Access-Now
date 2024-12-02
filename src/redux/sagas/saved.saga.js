import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Fetch all saved articles for the logged in user
function* fetchSavedArticles() {
  try {
    const articlesResponse = yield axios.get("/api/saved/articles");
    yield put({
      type: "SET_ARTICLES",
      payload: articlesResponse.data,
    });
  } catch (error) {
    console.log("fetchSavedArticles error in saga:", error);
  }
}

// Fetch all saved files for the logged in user
function* fetchSavedFiles() {
  try {
    const filesResponse = yield axios.get("/api/saved/files");
    yield put({
      type: "SET_FILES",
      payload: filesResponse.data,
    });
  } catch (error) {
    console.log("fetchSavedFiles error in saga:", error);
  }
}

// POST a new saved article for the user, then call a GET to refresh
function* saveArticle(action) {
  try {
    const data = {articleId: action.payload}
    yield axios.post("/api/saved/save-article", data);
    yield put({ type: "FETCH_SAVED_ARTICLES" });
  } catch (error) {
    console.error("saveArticle error in saved.saga", error);
  }
}

// POST a new saved file for the user, then call a GET to refresh
function* saveFile(action) {
  try {
    const data = {fileId: action.payload}
    yield axios.post("/api/saved/save-file", data);
    yield put({ type: "FETCH_SAVED_FILES" });
  } catch (error) {
    console.error("saveFile error in saved.saga", error);
  }
}

// DELETE the selected article from their list of saved articles, then call a GET to refresh
function* removeSavedArticle(action) {
  try {
    // action.payload is the article ID
    yield axios.delete(`/api/saved/article/${action.payload}`);
    yield put({ type: "FETCH_SAVED_ARTICLES" });
  } catch (error) {
    console.error("removeArticle error in saved.saga", error);
  }
}

// DELETE the selected file from their list of saved files, then call a GET to refresh
function* removeSavedFile(action) {
  try {
    // action.payload is the file ID
    yield axios.delete(`/api/saved/file/${action.payload}`);
    yield put({ type: "FETCH_SAVED_FILES" });
  } catch (error) {
    console.error("removeFile error in saved.saga", error);
  }
}

function* savedSaga() {
  yield takeLatest("FETCH_SAVED_ARTICLES", fetchSavedArticles);
  yield takeLatest("FETCH_SAVED_FILES", fetchSavedFiles);
  yield takeLatest("SAVE_ARTICLE", saveArticle);
  yield takeLatest("SAVE_FILE", saveFile);
  yield takeLatest("REMOVE_SAVED_ARTICLE", removeSavedArticle);
  yield takeLatest("REMOVE_SAVED_FILE", removeSavedFile);
}

export default savedSaga;
