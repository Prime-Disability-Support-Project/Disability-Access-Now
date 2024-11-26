import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function SavedResources() {
  const dispatch = useDispatch();
  const savedArticles = useSelector((store) => store.saved.savedArticles);
  const savedFiles = useSelector((store) => store.saved.savedFiles);

  useEffect(() => {
    dispatch({ type: "FETCH_SAVED_ARTICLES" });
    dispatch({ type: "FETCH_SAVED_FILES" });
  }, [dispatch]);


  const removeArticle = (articleId) => {
    dispatch({type: "REMOVE_ARTICLE", payload: articleId})
  }

  const removeFile = (id) => {
    console.log(id)
  }

  return (
    <div>
      <h1>Saved Resources</h1>
      <h2>Saved Articles</h2>
      <ul>
        {savedArticles.map((article) => {
          return (
            <>
              <li key={article.id}>
                <p>{article.title}</p>
                <a href={article.article_url}>{article.article_url}</a>
              </li>
              <button onClick={() => removeArticle(article.id)}>Remove Article</button>
            </>
          );
        })}
      </ul>
      <h2>Saved Files</h2>
      <ul>
        {savedFiles.map((file) => {
          return (
            <>
            <li key={file.id}>
              <p>{file.filename}</p>
            </li>
            <button onClick={() => removeFile(file.id)}>Remove File</button>
            </>
          );
        })}
      </ul>
    </div>
  );
}
