import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET all files
function* fetchAllFiles() {
  try {
    const filesResponse = yield axios.get("/api/files/allFiles");
    yield put({
      type: "SET_ALL_FILES",
      payload: filesResponse.data,
    });
  } catch (error) {
    console.log("fetchAllFiles error in saga:", error);
  }
}

// GET a specific file
function* fetchSpecificFile(action) {
  try {
    const fileId = action.payload;
    const filesResponse = yield axios.get(`/api/files/allFiles/${fileId}`);
    yield put({
      type: "SET_SPECIFIC_FILE",
      payload: filesResponse.data,
    });
  } catch (error) {
    console.log("fetchSpecificFile error in saga:", error);
  }
}

// GET all files associated with an article
function* fetchAssociatedFiles(action) {
    try {
      const articleId = action.payload;
      const filesResponse = yield axios.get(`/api/files/associatedFiles/${articleId}`);
      yield put({
        type: "SET_ASSOCIATED_FILES",
        payload: filesResponse.data,
      });
    } catch (error) {
      console.log("fetchSpecificFile error in saga:", error);
    }
  }

// DELETE the selected file, then call a GET to refresh
function* removeFile(action) {
  try {
    // action.payload is the article ID
    yield axios.delete(`/api/files/${action.payload}`);
    yield put({ type: "FETCH_ALL_FILES" });
  } catch (error) {
    console.error("removeFile error in articles.saga", error);
  }
}

function* filesSaga() {
  yield takeLatest("FETCH_ALL_FILES", fetchAllFiles);
  yield takeLatest("FETCH_SPECIFIC_FILE", fetchSpecificFile);
  yield takeLatest("FETCH_ASSOCIATED_FILES", fetchAssociatedFiles);
  yield takeLatest("REMOVE_FILE", removeFile);
}

export default filesSaga;
