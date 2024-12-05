import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

import "./AskAQuestion.css";

const AskQuestion = ({ articleId, close }) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [url, setUrl] = useState();
  const dispatch = useDispatch();

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  useEffect(() => {
    const urlResponse = window.location.href;
    setUrl(urlResponse);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (articleId) {
      try {
        const associatedArticleUrl = `${url}`;
        console.log(associatedArticleUrl);
        const response = await axios.post(
          "/api/questions/new-question-with-article",
          {
            question,
            associatedArticleUrl,
            questionDate: new Date().toISOString(),
          }
        );
        setQuestion("");
        setError(null);
        setSuccessMessage("Your question has been submitted successfully!");
      } catch (err) {
        setError("Error submitting your question. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        // Sends POST request to submit user question
        const response = await axios.post(
          "/api/questions/new-question-without-article",
          {
            question,
            questionDate: new Date().toISOString(),
          }
        );
        setQuestion("");
        setError(null);
        setSuccessMessage("Your question has been submitted successfully!");
      } catch (err) {
        setError("Error submitting your question. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <main id="content">
        <form onSubmit={handleSubmit} className="question-form">
          <h1>Ask A Question!</h1>
          <p>
            Ask a question to our admins and they will respond as soon as
            possible. These questions and answers are private to you.{" "}
          </p>
          <textarea
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter your question here..."
            required
          ></textarea>
          {successMessage && <div className="success">{successMessage}</div>}
          {error && <div className="error">{error}</div>}

          <Button type="submit" disabled={isLoading} variant="contained">
            {isLoading ? "Submitting..." : "Submit Question"}
          </Button>
          <Button className="close-button" variant="outlined" onClick={close}>
            Close
          </Button>
        </form>
      </main>
    </>
  );
};

export default AskQuestion;
