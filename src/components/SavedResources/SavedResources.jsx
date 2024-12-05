import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files
import Button from '@mui/material/Button';

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
    <main id="content">
      <h1>Saved Resources</h1>
      <h2>Saved Articles</h2>
      <ul>
        {savedArticles.map((article) => {
          return (
            <li key={article.id}>
              {/* Will need to update this to whatever the live web address ends up being */}
              <a href={`http://localhost:5173/#/articlePage/${article.id}`}>
                {article.title}
              </a>
              <Button onClick={() => removeArticle(article.id)} variant="outlined">
                Remove From Bookmarks
              </Button>
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
              <Button onClick={() => downloadFileHandler(file.filename)} variant="contained">
                Download PDF
              </Button>
              <Button onClick={() => removeFile(file.id)} variant="outlined">
                Remove From Bookmarks
              </Button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
