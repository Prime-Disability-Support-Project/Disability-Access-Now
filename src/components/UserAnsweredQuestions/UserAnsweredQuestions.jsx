import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function UserAnsweredQuestions() {
  const dispatch = useDispatch();
  const answeredQuestions = useSelector(
    (store) => store.userQuestions.userAnswered
  );

  useEffect(() => {
    dispatch({ type: "FETCH_USER_ANSWERED" });
  }, [dispatch]);

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
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
