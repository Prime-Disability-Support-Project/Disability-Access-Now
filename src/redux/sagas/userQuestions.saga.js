import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchUserUnanswered() {
  try {
    const questionsResponse = yield axios.get("/api/questions/user-unanswered-questions");
    yield put({
      type: "SET_USER_UNANSWERED",
      payload: questionsResponse.data,
    });
  } catch (error) {
    console.log("fetchUserUnanswered error in saga:", error);
  }
}

function* fetchUserAnswered() {
  try {
    const questionsResponse = yield axios.get("/api/questions/user-answered-questions");
    yield put({
      type: "SET_USER_ANSWERED",
      payload: questionsResponse.data,
    });
  } catch (error) {
    console.log("fetchUserAnswered error in saga:", error);
  }
}

function* userQuestionsSaga() {
  yield takeLatest("FETCH_UNANSWERED", fetchUserUnanswered);
  yield takeLatest("FETCH_ANSWERED", fetchUserAnswered);
}

export default userQuestionsSaga;
