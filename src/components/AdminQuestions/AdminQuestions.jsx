import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminUnansweredQuestions from "../Admin/AdminAskedQuestion/AdminAskedQuestion";
import AdminAnsweredQuestions from "../Admin/AdminAnsweredQuestion/AdminAnsweredQuestion";
import AdminAnswerInput from "../Admin/AdminAnswerInput/AdminAnswerInput";

export default function AdminQuestions() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [view, setView] = useState("unanswered");
  const dispatch = useDispatch();

  // fetch questions on component mount
  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
    dispatch({ type: "FETCH_ADMIN_ANSWERED" });
  }, [dispatch]);
  // handler for open answer popup
  const handleAnswerQuestion = (question) => {
    setSelectedQuestion(question);
  };
  //handler for close answer popup
  const handleClosePopup = () => {
    setSelectedQuestion(null);
    dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
    dispatch({ type: "FETCH_ADMIN_ANSWERED" });
  };
  //handler for submit answer
  const handleSubmitAnswer = () => {
    //refresh questions after submitting
    setSelectedQuestion(null);
  };

  return (
    <div className="admin-questions-container">
      <div className="tabs">
        <button onClick={() => setView("unanswered")}>
          Unanswered Questions
        </button>
        <button onClick={() => setView("answered")}>Answered Questions</button>
      </div>
      <div className="questions-list">
        {view === "unanswered" ? (
            <AdminUnansweredQuestions onAnswerQuestion={handleAnswerQuestion}  />
        ) : (
            <AdminAnsweredQuestions />
        )}
        </div>


      {/* answer popup */}
      {selectedQuestion && (
        <AdminAnswerInput
          question={selectedQuestion}
          onClose={handleClosePopup}
          onSubmit={handleSubmitAnswer}
        />
      )}
    </div>
  );
}
