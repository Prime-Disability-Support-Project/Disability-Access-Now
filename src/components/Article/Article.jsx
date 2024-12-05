import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { downloadFileHandler } from "../Blob/downloadFile";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AskQuestion from "../AskAQuestion/AskAQuestion";
import "./Article.css";

export default function Article() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  // const [url, setUrl] = useState();

  const close = () => {
    setShowPopup(!showPopup);
  };

  const specificArticle = useSelector(
    (store) => store.articles.specificArticle
  );
  const savedArticles = useSelector((store) => store.saved.savedArticles);
  const associatedFiles = useSelector((store) => store.files.associatedFiles);

  const handleBookmark = (e) => {
    e.preventDefault();
    dispatch({ type: "SAVE_ARTICLE", payload: specificArticle.id });
  };

  const removeArticle = (articleId) => {
    dispatch({ type: "REMOVE_SAVED_ARTICLE", payload: articleId });
  };

  useEffect(() => {
    const url = window.location.href;
    // setUrl(url)
    const articleId = url.split("/").pop();
    dispatch({
      type: "FETCH_SPECIFIC_ARTICLE",
      payload: articleId,
    });
    dispatch({ type: "FETCH_ASSOCIATED_FILES", payload: articleId });
    dispatch({ type: "FETCH_SAVED_ARTICLES" });
  }, []);

  return (
    <div>
      <div className="ask-title">
        <button className="ask-button" onClick={close}>
          Click here to ask a question about this article
        </button>
      </div>
      {/* Pop-up for asking a question */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <AskQuestion articleId={specificArticle.id} close={close} />
          </div>
        </div>
      )}
      <button onClick={() => history.goBack()}>Back</button>
      {/* Conditionally render Bookmark button if the article isn't already bookmarked */}
      {savedArticles.some(
        (article) => article["id"] === specificArticle["id"]
      ) ? (
        <button onClick={() => removeArticle(specificArticle.id)}>
          Remove From Bookmarks
        </button>
      ) : (
        <button onClick={handleBookmark}>Bookmark this Article</button>
      )}
      {/* <h1>{specificArticle.title}</h1>
      <h2>
        <em>{specificArticle.subtitle}</em>
      </h2> */}
      <Markdown className="article" remarkPlugins={[remarkGfm]}>
        {specificArticle.body}
      </Markdown>
      <h2>Associated Files:</h2>
      <ul>
        {associatedFiles.length > 0 ? (
          associatedFiles.map((file) => {
            return (
              <li>
                {file.filename}{" "}
                <button onClick={() => downloadFileHandler(file.filename)}>
                  Download PDF
                </button>
              </li>
            );
          })
        ) : (
          <p>No Associated Files</p>
        )}
      </ul>
    </div>
  );
}
