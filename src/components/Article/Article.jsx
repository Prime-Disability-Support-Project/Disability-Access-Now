import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Article() {
  const history = useHistory();
  const dispatch = useDispatch();

  const specificArticle = useSelector(
    (store) => store.articles.specificArticle
  );

  useEffect(() => {
    const url = window.location.href;
    const articleId = url.split("/").pop();
    dispatch({
      type: "FETCH_SPECIFIC_ARTICLE",
      payload: articleId,
    });
  }, []);

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      <h1>{specificArticle.title}</h1>
      <h2>{specificArticle.subtitle}</h2>
      <p>{specificArticle.body}</p>
    </div>
  );
}
