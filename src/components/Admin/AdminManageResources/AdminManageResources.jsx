import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminManageResources() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allArticles = useSelector((store) => store.articles.allArticles);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_ARTICLES" });
  }, [dispatch]);

  const handleEdit = (articleId) => {};

  const handleDelete = (articleId) => {
    dispatch({ type: "REMOVE_ARTICLE", payload: articleId });
  };

  return (
    <div>
      <ul>
        {allArticles.map((article) => {
          return (
            <li key={article.id}>
              {article.title}
              <button onClick={() => handleEdit(article.id)}>Edit</button>
              <button onClick={() => handleDelete(article.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
