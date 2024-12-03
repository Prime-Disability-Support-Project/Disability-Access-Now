import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAnswerInput.css";

export default function AdminAnswerInput({ question, onClose, onSubmit }) {
  const [answer, setAnswer] = useState("");
  const [user, setUser] = useState(null);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/questions/details/${question.id}`)
      .then((response) => {
        setUser(response.data[0]);
        setArticle(response.data[0].associated_article_url);
      })
      .catch((error) => {
        console.log("Error fetching question details:", error);
      });
  }, [question.id]);

  const handleSubmitAnswer = () => {
    if (answer.trim()) {
      axios
        .post("/api/questions/answer", {
          questionId: question.id,
          answer: answer,
        })
        .then(() => {
          onSubmit();
          onClose();
        });
    }
  };

  return (
    <div className="answer-popup">
      <div className="popup-content">
        <div className="popup-header">
          <h3>Answer Question</h3>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="question-details">
          <div className="question-info">
            <p>Username: {user?.name}</p>
            <p>Date Asked: {question.question_date}</p>
            <p>Associated Article: </p>{" "}
            {article ? (
              <a href={article}>{article}</a>
            ) : (
              <p>No article was associated with this question</p>
            )}
          </div>
          <p>Question: {question.question}</p>
        </div>
        <textarea
          className="answer-textarea"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
        />
        <div className="popup-actions">
          <button className="submit-button" onClick={handleSubmitAnswer}>
            Submit Answer
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
