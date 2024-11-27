import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Fetch all users, separate GETs for approved and pending users
function* fetchAllUsers() {
  try {
    const userResponse = yield axios.get("/api/user/allApproved");
    yield put({
      type: "SET_ALL_APPROVED_USERS",
      payload: userResponse.data,
    });
    const userPendingResponse = yield axios.get("/api/user/allPending");
    yield put({
        type: "SET_ALL_PENDING_USERS",
        payload: userPendingResponse.data,
      });
  } catch (error) {
    console.log("fetchAllUsers error in saga:", error);
  }
}

// Update approved to true for the selected user
function* approveLogin(action) {
    try {
      // action.payload is the user ID
      yield axios.put(`/api/user/${action.payload}`);
      yield put({ type: "FETCH_ALL_USERS" });
    } catch (error) {
      console.error("approveLogin error in saved.saga", error);
    }
  }

function* userLoginsSaga() {
  yield takeLatest("FETCH_ALL_USERS", fetchAllUsers);
  yield takeLatest("APPROVE_LOGIN", approveLogin);
}

export default userLoginsSaga;
