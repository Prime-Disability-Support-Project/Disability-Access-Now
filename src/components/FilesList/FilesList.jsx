import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files

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
    <div>
      <ul>
        {allFiles.map((file) => {
          return (
            <li key={file.id}>
              <p>{file.filename}</p>
              <button onClick={() => downloadFileHandler(file.filename)}>
                Download PDF
              </button>
              {/* Conditionally render Bookmark button if the file isn't already bookmarked */}
              {savedFiles.some((savedFile) => savedFile["id"] === file.id) ? (
                <button onClick={() => removeFile(file.id)}>
                  Remove From Bookmarks
                </button>
              ) : (
                <button onClick={() => handleBookmark(file.id, event)}>
                  Bookmark this File
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
