import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import "./Article.css";

export default function Article() {
  const history = useHistory();
  const dispatch = useDispatch();

  const specificArticle = useSelector(
    (store) => store.articles.specificArticle
  );

  const associatedFiles = useSelector((store) => store.files.associatedFiles);

  useEffect(() => {
    const url = window.location.href;
    const articleId = url.split("/").pop();
    dispatch({
      type: "FETCH_SPECIFIC_ARTICLE",
      payload: articleId,
    });
    dispatch({ type: "FETCH_ASSOCIATED_FILES", payload: articleId });
  }, []);

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      <h1>{specificArticle.title}</h1>
      <h2>
        <em>{specificArticle.subtitle}</em>
      </h2>
      <Markdown className="article">{specificArticle.body}</Markdown>
      <h2>Associated Files:</h2>
      <ul>
        {associatedFiles.length > 0 ? (
          associatedFiles.map((file) => {
            return <li>{file.filename}</li>;
          })
        ) : (
          <p>No Associated Files</p>
        )}
      </ul>
    </div>
  );
}
