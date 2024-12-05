import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files
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
          <li key={file.id} style={{marginBottom: "2rem"}}>
            <p>{file.filename}</p>
            <Button
              onClick={() => downloadFileHandler(file.filename)}
              variant="contained"
              sx={{marginRight: '1rem'}}
            >
              Download PDF
            </Button>
            {/* Conditionally render Bookmark button if the file isn't already bookmarked */}
            {savedFiles.some((savedFile) => savedFile["id"] === file.id) ? (
              <Button onClick={() => removeFile(file.id)} variant="outlined"
                aria-pressed="true" // Indicates the button is in the "active" state (bookmarked)
                aria-label={`Remove ${file.filename} from bookmarks`} // Descriptive label for screen readers
              
              >
                Remove From Bookmarks
              </Button>
            ) : (
              <Button
                onClick={(event) => handleBookmark(file.id, event)}
                variant="outlined"
                aria-pressed="false" // Indicates the button is in the "inactive" state (not bookmarked)
                aria-label={`Bookmark ${file.filename}`} // Descriptive label for screen readers
              >
                Bookmark this File
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
