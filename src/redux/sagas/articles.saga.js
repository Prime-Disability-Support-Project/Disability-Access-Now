import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchAllArticles() {
  try {
    const articlesResponse = yield axios.get("/api/articles");
    yield put({
      type: "SET_ALL_ARTICLES",
      payload: articlesResponse.data,
    });
  } catch (error) {
    console.log("fetchAllArticles error in saga:", error);
  }
}

function* fetchSpecificArticle(action) {
  try {
    const articleId = action.payload
    const articlesResponse = yield axios.get(`/api/articles/${articleId}`);
    yield put({
      type: "SET_SPECIFIC_ARTICLE",
      payload: articlesResponse.data,
    });
  } catch (error) {
    console.log("fetchSpecificArticle error in saga:", error);
  }
}

function* articlesSaga() {
  yield takeLatest("FETCH_ALL_ARTICLES", fetchAllArticles);
  yield takeLatest("FETCH_SPECIFIC_ARTICLE", fetchSpecificArticle);
}

export default articlesSaga;
