import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function UserAnsweredQuestions() {
  const dispatch = useDispatch();
  const answeredQuestions = useSelector(
    (store) => store.userQuestions.userAnswered
  );

  useEffect(() => {
    dispatch({ type: "FETCH_USER_ANSWERED" });
  }, [dispatch]);

  const handleRead = (questionId) => {
    const data = { questionId: questionId };
    axios.put("/api/questions/user-unread", data).then(() => {
      dispatch({ type: "FETCH_USER_ANSWERED" });
    });
  };

  return (
    <div>
      <h1>Answered Questions</h1>
      <ul>
        {answeredQuestions.map((question) => {
          return (
            <div key={question.id} className="questions-list">
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
          );
        })}
      </ul>
    </div>
  );
}
