import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files

export default function SavedResources() {
  const dispatch = useDispatch();
  const savedArticles = useSelector((store) => store.saved.savedArticles);
  const savedFiles = useSelector((store) => store.saved.savedFiles);

  useEffect(() => {
    dispatch({ type: "FETCH_SAVED_ARTICLES" });
    dispatch({ type: "FETCH_SAVED_FILES" });
  }, [dispatch]);

  const removeArticle = (articleId) => {
    dispatch({ type: "REMOVE_SAVED_ARTICLE", payload: articleId });
  };

  const removeFile = (fileId) => {
    dispatch({ type: "REMOVE_SAVED_FILE", payload: fileId });
  };

  return (
    <div>
      <h1>Saved Resources</h1>
      <h2>Saved Articles</h2>
      <ul>
        {savedArticles.map((article) => {
          return (
            <li key={article.id}>
              <a href={`http://localhost:5173/#/articlePage/${article.id}`}>
                {article.title}
              </a>
              <button onClick={() => removeArticle(article.id)}>
                Remove From Saved
              </button>
            </li>
          );
        })}
      </ul>
      <h2>Saved Files</h2>
      <ul>
        {savedFiles.map((file) => {
          return (
            <li key={file.id}>
              <p>{file.filename}</p>
              <button onClick={() => downloadFileHandler(file.filename)}>
                Download PDF
              </button>
              <button onClick={() => removeFile(file.id)}>
                Remove From Saved
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
