import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import AdminUnansweredQuestions from "../Admin/AdminAskedQuestion/AdminAskedQuestion";
import AdminAnsweredQuestions from "../Admin/AdminAnsweredQuestion/AdminAnsweredQuestion";
import AdminAnswerInput from "../Admin/AdminAnswerInput/AdminAnswerInput";

export default function AdminQuestions() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [view, setView] = useState("unanswered");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
    dispatch({ type: "FETCH_ADMIN_ANSWERED" });
  }, [dispatch]);

  const handleAnswerQuestion = (question) => {
    setSelectedQuestion(question);
  };

  const handleClosePopup = () => {
    setSelectedQuestion(null);
    dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
    dispatch({ type: "FETCH_ADMIN_ANSWERED" });
  };

  const handleSubmitAnswer = () => {
    //refresh questions after submitting
    setSelectedQuestion(null);
  };

  return (
    <main id="content" tabIndex="-1">
      <Box
        className="tabs"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          onClick={() => setView("unanswered")}
          variant={view === "unanswered" ? "contained" : "outlined"}
        >
          Unanswered Questions
        </Button>
        <Button
          onClick={() => setView("answered")}
          variant={view === "answered" ? "contained" : "outlined"}
        >
          Answered Questions
        </Button>
      </Box>

      <div className="question-list">
        {view === "unanswered" ? (
          <AdminUnansweredQuestions onAnswerQuestion={handleAnswerQuestion} />
        ) : (
          <AdminAnsweredQuestions />
        )}
      </div>
      {selectedQuestion && (
        <AdminAnswerInput
          question={selectedQuestion}
          onAnswerQuestion={handleAnswerQuestion}
          onClose={handleClosePopup}
          onSubmit={handleSubmitAnswer}
        />
      )}
    </main>
  );
}
