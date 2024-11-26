import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function UserUnansweredQuestions() {
  const dispatch = useDispatch();
  const unansweredQuestions = useSelector(
    (store) => store.userQuestions.userUnanswered
  );

  useEffect(() => {
    dispatch({ type: "FETCH_USER_UNANSWERED" });
    console.log(unansweredQuestions);
  }, [dispatch]);

  return (
    <div>
      <h1>Unanswered Questions</h1>
      <ul>
        {unansweredQuestions.map((question) => {
          return (
            <li key={question.id}>
              <p>Question: {question.question}</p>
              <p>Date Submitted: {question.question_date}</p>
              <p>
                Associated Article:{" "}
                {question.associated_article_url
                  ? <a href={question.associated_article_url}>{question.associated_article_url}</a>
                  : "No article was associated with this question"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
