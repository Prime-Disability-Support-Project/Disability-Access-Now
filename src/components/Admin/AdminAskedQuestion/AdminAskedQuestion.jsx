import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./AdminAskedQuestion.css"

export default function AdminUnansweredQuestions({ onAnswerQuestion }) {
    const dispatch = useDispatch();
  const unansweredQuestions = useSelector(
    (store) => store.adminQuestions.adminUnanswered || []
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
  }, [dispatch]);

  const handleRead = (questionId) => {
    const data = { questionId: questionId };
    axios.put("/api/questions/user-unread", data).then(() => {
      dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
    });
  };

  return (
    <div className="unanswered-questions-section">
      <h2>Unanswered Questions</h2>
      {unansweredQuestions.length === 0 ? (
        <p>No unanswered questions found.</p>
      ) : (
        <ul>
          {unansweredQuestions.map((question) => ( 
            <div key={question.id} className="unanswered-question">
              <li>
                <p>Question: {question.question}</p>
                <p>Date Submitted: {question.question_date}</p>
                <p>
                  Associated Article: {""}
                  {question.associated_article_url ? (
                    <a href={question.associated_article_url}>
                      {question.associated_article_url}
                    </a>
                  ) : (
                    "No article was associated with this question"
                  )}
                </p>
                <button onClick={() => onAnswerQuestion(question)}>
                  Answer Question
                </button>
                {question.unread === true ? (
                  <button onClick={() => handleRead(question.id)}>
                    Mark as Read
                  </button>
                ) : (
                  <button onClick={() => handleRead(question.id)}>
                    Mark as Unread
                  </button>
                )}
              </li>
            </div>
          ))}
      </ul>
      )}
    </div>
  );
}