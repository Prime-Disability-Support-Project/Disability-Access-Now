import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET all articles
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

// GET a specific article
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

// POST a new article, then call a GET to refresh
function* addArticle(action) {
    try {
      yield axios.post("/api/articles", action.payload);
      yield put({ type: "FETCH_ALL_ARTICLES" });
    } catch (error) {
      console.error("addArticle error in articles.saga", error);
    }
  }

// Update an article's content
function* editArticle(action) {
    try {
      yield axios.put(`/api/articles/${action.payload.articleId}`, action.payload);
      yield put({ type: "FETCH_ALL_ARTICLES" });
    } catch (error) {
      console.error("editArticle error in articles.saga", error);
    }
  }

// DELETE the selected article, then call a GET to refresh
function* removeArticle(action) {
    try {
      // action.payload is the article ID
      yield axios.delete(`/api/articles/${action.payload}`);
      yield put({ type: "FETCH_ALL_ARTICLES" });
    } catch (error) {
      console.error("removeArticle error in articles.saga", error);
    }
  }

function* articlesSaga() {
  yield takeLatest("FETCH_ALL_ARTICLES", fetchAllArticles);
  yield takeLatest("FETCH_SPECIFIC_ARTICLE", fetchSpecificArticle);
  yield takeLatest("REMOVE_ARTICLE", removeArticle);
  yield takeLatest("EDIT_ARTICLE", editArticle);
  yield takeLatest("ADD_ARTICLE", addArticle);
}

export default articlesSaga;
