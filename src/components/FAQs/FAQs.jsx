import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";


const FAQ = () => {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    axios
      .get("/api/articles/faq")
      .then((response) => {
        setFaq(response.data);
      })
      .catch((error) => {
        console.log("Error fetching FAQ:", error);
      });
  }, []);

  return (
    <div>
      <h1>FAQs</h1>
      <Markdown>{faq.body}</Markdown>
    </div>
  );
};

export default FAQ;
