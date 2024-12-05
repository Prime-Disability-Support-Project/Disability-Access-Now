import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'



const AmIEligible = () => {
  const [articleBody, setArticleBody] = useState([]);

  useEffect(() => {
    axios
      .get("/api/articles/eligible")
      .then((response) => {
        setArticleBody(response.data);
      })
      .catch((error) => {
        console.log("Error fetching Am I Eligible article:", error);
      });
  }, []);

  return (
    <div>
      <Markdown remarkPlugins={[remarkGfm]}>{articleBody.body}</Markdown>
    </div>
  );
};

export default AmIEligible;
