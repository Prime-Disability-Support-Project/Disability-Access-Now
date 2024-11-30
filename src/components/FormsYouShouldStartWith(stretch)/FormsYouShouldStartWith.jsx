import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function FormsYouShouldStartWith() {
  const dispatch = useDispatch();
  const [article, setArticle] = useState([]);

  const associatedFiles = useSelector((store) => store.files.associatedFiles);

  useEffect(() => {
    axios
      .get("/api/articles/forms")
      .then((response) => {
        const articleData = response.data;
        setArticle(response.data);
        dispatch({ type: "FETCH_ASSOCIATED_FILES", payload: articleData.id });
      })
      .catch((error) => {
        console.log(
          "Error fetching Forms You Should Start With article:",
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>{article.title}</h1>
      <h2>{article.subtitle}</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{article.body}</Markdown>
      <ul>
        {associatedFiles.length > 0 ? (
          associatedFiles.map((file) => {
            return <li key={file.id}>{file.filename}</li>;
          })
        ) : (
          <p>No Associated Files</p>
        )}
      </ul>
    </div>
  );
}
