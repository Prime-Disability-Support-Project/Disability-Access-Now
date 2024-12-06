import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { downloadFileHandler } from "../Blob/downloadFile";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
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
    <main id="content" tabIndex="-1">
      <Button
        className="ask-button"
        onClick={close}
        variant="contained"
        aria-label="Ask a question about this article"
      >
        Ask a question about this article
      </Button>
      {/* Pop-up for asking a question */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <AskQuestion articleId={specificArticle.id} close={close} />
          </div>
        </div>
      )}
      <Button
        onClick={() => history.goBack()}
        variant="outlined"
        aria-label="Go back to the previous page"
      >
        Back
      </Button>
      {/* Conditionally render Bookmark button if the article isn't already bookmarked */}
      {savedArticles.some(
        (article) => article["id"] === specificArticle["id"]
      ) ? (
        <Button
          onClick={() => removeArticle(specificArticle.id)}
          aria-label="Remove this article from bookmarks"
        >
          Remove From Bookmarks
        </Button>
      ) : (
        <Button onClick={handleBookmark} aria-label="Bookmark this article">
          Bookmark this Article
        </Button>
      )}
      <Markdown className="article" remarkPlugins={[remarkGfm]}>
        {specificArticle.body}
      </Markdown>
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          component={"h2"}
          gutterBottom
        >
          Associated Files:
        </Typography>
        <List>
          {associatedFiles.length > 0 ? (
            associatedFiles.map((file) => {
              return (
                <ListItem
                  key={file.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItemText primary={file.filename} />
                  <Button
                    onClick={() => downloadFileHandler(file.filename)}
                    variant="contained"
                    aria-label={`Download PDF for ${file.filename}`}
                  >
                    Download PDF
                  </Button>
                </ListItem>
              );
            })
          ) : (
            <p>No Associated Files</p>
          )}
        </List>
      </Box>
    </main>
  );
}
