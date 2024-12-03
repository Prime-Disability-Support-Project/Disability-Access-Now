import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./AdminAnsweredQuestion.css";


export default function AdminAnsweredQuestions() {
  const dispatch = useDispatch();
  const answeredQuestions = useSelector(
    (store) => store.adminQuestions.adminAnswered || []
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_ANSWERED" });
  }, [dispatch]);


  const handleDeleteQuestion = (questionId) => {
    axios.delete(`/api/questions/${questionId}`).then(() => {
      dispatch({ type: "FETCH_ADMIN_ANSWERED" });
    });
  };

  return (
    <div className="answered-questions-section">
      <h2>Answered Questions</h2>
      {answeredQuestions.length === 0 ? (
        <p>No answered questions found.</p>
      ) : (
        <ul>
          {answeredQuestions.map((question) => (
            <div key={question.id} className="answered-question">
              <li>
                <p>Question: {question.question}</p>
                <p>Answer: {question.answer}</p>
                <p>Date Submitted: {question.question_date}</p>
                <p>
                  Associated Article:{" "}
                  {question.associated_article_url ? (
                    <a href={question.associated_article_url}>
                      {question.associated_article_url}
                    </a>
                  ) : (
                    "No article was associated with this question"
                  )}
                </p>
                <button onClick={() => handleDeleteQuestion(question.id)}>
                  Delete Question
                </button>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}