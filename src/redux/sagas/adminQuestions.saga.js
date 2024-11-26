import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchAdminUnanswered() {
  try {
    const questionsResponse = yield axios.get("/api/questions/user-unanswered-questions");
    yield put({
      type: "SET_ADMIN_UNANSWERED",
      payload: questionsResponse.data,
    });
  } catch (error) {
    console.log("fetchAdminUnanswered error in saga:", error);
  }
}

function* fetchAdminAnswered() {
  try {
    const questionsResponse = yield axios.get("/api/questions/user-answered-questions");
    yield put({
      type: "SET_ADMIN_ANSWERED",
      payload: questionsResponse.data,
    });
  } catch (error) {
    console.log("fetchAdminAnswered error in saga:", error);
  }
}

function* adminQuestionsSaga() {
  yield takeLatest("FETCH_ADMIN_UNANSWERED", fetchAdminUnanswered);
  yield takeLatest("FETCH_ADMIN_ANSWERED", fetchAdminAnswered);
}

export default adminQuestionsSaga;
