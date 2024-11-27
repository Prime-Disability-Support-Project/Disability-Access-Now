import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadPDF from "../../Blob/UploadPDF";

export default function AdminManageResources() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allArticles = useSelector((store) => store.articles.allArticles);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_ARTICLES" });
  }, [dispatch]);

  const handleEdit = (articleId) => {
    history.push(`/editArticle/${articleId}`);
  };

  const handleDelete = (articleId) => {
    dispatch({ type: "REMOVE_ARTICLE", payload: articleId });
  };

  return (
    <div>
      <h1>Manage Resources</h1>
      <h2>Add New Resources</h2>
      <button onClick={() => history.push("/adminAddArticle")}>Add a New Article</button>
      <UploadPDF />
      <h2>Choose an Article to Edit</h2>
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
