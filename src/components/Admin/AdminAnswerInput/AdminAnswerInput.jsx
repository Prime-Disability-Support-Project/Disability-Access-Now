import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Box, Typography } from "@mui/material";  // Material UI Modal and Button
import axios from "axios";
import "./AdminAnswerInput.css";

export default function AdminAnswerInput({ question, onClose, onSubmit, onAnswerQuestion }) {
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
    .put(`/api/questions/flag`, {questionId: question.id})
    .then((response) => {
      setFlagged(!flagged)
      console.log('flagged toggled')
    })
    .catch((error) => {
      console.log("Error fetching question details:", error);
    });
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

  return (

    <div className="answer-popup">
       {/* Modal Component */}
     <Modal
     open={onAnswerQuestion}
     onClose={onClose} // Close modal when clicked outside
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
   >
     <Box sx={{ ...style }}>
       <Typography id="modal-modal-title" variant="h6" component="h2">
       Answer Question 
       </Typography>
       <Typography id="modal-modal-description" sx={{ mt: 2 }}>
       <p>Username: {user?.name}</p>
            <p>Date Asked: {question.question_date}</p>
            <p>Associated Article: </p>{" "}
            {article ? (
              <a href={article}>{article}</a>
            ) : (
              <p>No article was associated with this question</p>
            )}

       </Typography>
       <Typography>
       <p>Question: {question.question}</p>
       </Typography>
       <textarea
          className="answer-textarea"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
        />
       <Button className="submit-button" onClick={handleSubmitAnswer} variant="contained">
            Submit Answer
          </Button>
          {flagged === false ? (
            <Button onClick={handleFlag} variant="outlined">Flag for help</Button>
          ) : (
            <Button onClick={handleFlag} variant="outlined">Question has been flagged for help</Button>
          )}
          <Button className="cancel-button" onClick={onClose} variant="text">
            Cancel
          </Button>
     </Box>
   </Modal>
    </div>
  );
}
