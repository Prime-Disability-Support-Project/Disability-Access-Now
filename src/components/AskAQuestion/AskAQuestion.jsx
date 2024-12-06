import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";

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
        close();
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
        close();
      } catch (err) {
        setError("Error submitting your question. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
    maxWidth: "1200",
  };

  return (
    <div>
      <Modal
        open={close}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit}  sx={{ ...style }}>
          <Typography id="modal-modal-title" variant="h6" component="h1" sx={{fontWeight: "bold"}}>
            Ask a Question!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component={"h2"}
          >
            <p>
              Ask a question to our admins and they will respond as soon as
              possible. These questions and answers are private to you.{" "}
            </p>
          </Typography>
          <TextField
            value={question}
            onChange={handleQuestionChange}
            label="Enter your question here..."
            rows={3}
            maxRows={3}
            multiline
            fullWidth
          />
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button type="submit" disabled={isLoading} variant="contained">
              Submit Question
            </Button>
            <Button className="close-button" variant="outlined" onClick={close}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AskQuestion;
