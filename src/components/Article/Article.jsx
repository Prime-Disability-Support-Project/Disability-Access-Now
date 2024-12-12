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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AskQuestion from "../AskAQuestion/AskAQuestion";
import "./Article.css";

export default function Article() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);

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

  const scrollToTop = () => {
    document.getElementById("content").focus();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // URL contains the articleId (e.g. /articlePage/3)
    const url = window.location.href;
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
      <Box>
        <Button
          className="ask-button"
          onClick={close}
          variant="contained"
          aria-label="Ask a question about this article"
          sx={{ marginRight: 2 }}
        >
          Ask a question about this article
        </Button>
        {/* Conditionally render Bookmark button if the article isn't already bookmarked */}
        {savedArticles.some(
          (article) => article["id"] === specificArticle["id"]
        ) ? (
          <Button
            onClick={() => removeArticle(specificArticle.id)}
            aria-label="Remove this article from bookmarks"
            variant="text"
            sx={{ minWidth: 165 }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookmarkIcon sx={{ marginRight: 1 }} />
              Unbookmark
            </span>{" "}
          </Button>
        ) : (
          <Button
            onClick={handleBookmark}
            aria-label="Bookmark this article"
            variant="text"
            sx={{ minWidth: 165 }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookmarkBorderIcon sx={{ marginRight: 1 }} />
              Bookmark
            </span>{" "}
          </Button>
        )}
      </Box>
      {/* Modal for asking a question */}
      {showPopup && (
        <AskQuestion articleId={specificArticle.id} close={close} />
      )}
      <Box>
        <Button
          onClick={() => history.goBack()}
          variant="outlined"
          aria-label="Go back to the previous page"
        >
          Back
        </Button>
      </Box>
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
      <Button onClick={scrollToTop} variant="contained" aria-label="">
        Return to Top
      </Button>
    </main>
  );
}
