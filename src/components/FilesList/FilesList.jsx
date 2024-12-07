import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Button from "@mui/material/Button";

export default function FilesList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allFiles = useSelector((store) => store.files.allFiles);
  const savedFiles = useSelector((store) => store.saved.savedFiles);

  const handleBookmark = (fileId, event) => {
    event.preventDefault();
    dispatch({ type: "SAVE_FILE", payload: fileId });
  };

  const removeFile = (fileId) => {
    dispatch({ type: "REMOVE_SAVED_FILE", payload: fileId });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_FILES" });
    dispatch({ type: "FETCH_SAVED_FILES" });
  }, [dispatch]);

  return (
    <ul aria-label="List of Files">
      {allFiles.map((file) => {
        return (
          <>
            <li key={file.id} style={{ marginBottom: "2rem" }}>
              <p>{file.filename}</p>
              <Button
                onClick={() => downloadFileHandler(file.filename)}
                variant="contained"
                sx={{ marginRight: "1rem" }}
              >
                Download PDF
              </Button>
              {/* Conditionally render Bookmark button if the file isn't already bookmarked */}
              {savedFiles.some((savedFile) => savedFile["id"] === file.id) ? (
                <Button
                  onClick={() => removeFile(file.id)}
                  variant="text"
                  aria-pressed="true"
                  aria-label={`Remove ${file.filename} from bookmarks`}
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
                  onClick={(event) => handleBookmark(file.id, event)}
                  variant="text"
                  aria-pressed="false"
                  aria-label={`Bookmark ${file.filename}`}
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
            </li>
            <Divider />
          </>
        );
      })}
    </ul>
  );
}
