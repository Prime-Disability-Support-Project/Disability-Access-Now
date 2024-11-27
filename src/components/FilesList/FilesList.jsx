import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FilesList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allFiles = useSelector((store) => store.files.allFiles);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_FILES" });
  }, [dispatch]);

  return (
    <div>
      <ul>
        {allFiles.map((file) => {
          return (
            <li key={file.id}>
              <p>{file.filename}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}