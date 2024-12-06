import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Box, Typography, TextField } from "@mui/material"; 
import axios from "axios";
import "./AdminAnswerInput.css";

export default function AdminAnswerInput({
  question,
  onClose,
  onSubmit,
  onAnswerQuestion,
}) {
  const [answer, setAnswer] = useState("");
  const [user, setUser] = useState(null);
  const [article, setArticle] = useState(null);
  const [flagged, setFlagged] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/questions/details/${question.id}`)
      .then((response) => {
        setUser(response.data[0]);
        setArticle(response.data[0].associated_article_url);
        setFlagged(response.data[0].flagged);
      })
      .catch((error) => {
        console.log("Error fetching question details:", error);
      });
  }, [question.id]);

  const handleSubmitAnswer = () => {
    if (answer.trim()) {
      const data = {
        questionId: question.id,
        answer: answer,
        question: question.question,
        email: user.email,
      };
      axios.put("/api/questions/admin-answer", data).then((response) => {
        dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
        dispatch({ type: "FETCH_ADMIN_ANSWERED" });
        onClose();
      });
    }
  };

  const handleFlag = () => {
    axios
      .put(`/api/questions/flag`, { questionId: question.id })
      .then((response) => {
        setFlagged(!flagged);
        console.log("flagged toggled");
      })
      .catch((error) => {
        console.log("Error fetching question details:", error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
    maxWidth: "1200"
  };

  return (
    <div className="answer-popup">
      <Modal
        open={onAnswerQuestion}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
      >
        <Box component={"form"} sx={{ ...style }}>
          <Typography id="modal-modal-title" variant="h6" component="h1" sx={{fontWeight: "bold"}}>
            Answer Question
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Date Submitted:</strong> {question.question_date.split("T")[0]}</p>
            <p>
              <strong>Associated Article:</strong>
              {article ? (
                <a href={article}>{article}</a>
              ) : (
                <p>No article was associated with this question</p>
              )}{" "}
            </p>
          </Typography>
          <Typography>
            <p><strong>Question:</strong> {question.question}</p>
          </Typography>
          <TextField
            className="answer-textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            label="Type your answer here"
            rows={3}
            maxRows={3}
            multiline
          />
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              className="submit-button"
              onClick={handleSubmitAnswer}
              variant="contained"
            >
              Submit Answer
            </Button>
            {flagged === false ? (
              <Button onClick={handleFlag} variant="outlined">
                Flag for help
              </Button>
            ) : (
              <Button onClick={handleFlag} variant="outlined">
                Question has been flagged for help
              </Button>
            )}
            <Button className="cancel-button" onClick={onClose} variant="text" color="error">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
