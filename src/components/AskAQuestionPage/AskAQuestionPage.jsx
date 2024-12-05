import UserUnansweredQuestions from "../UserUnansweredQuestions/UserUnansweredQuestions";
import UserAnsweredQuestions from "../UserAnsweredQuestions/UserAnsweredQuestions";
import Button from "@mui/material/Button";
import AskQuestion from "../AskAQuestion/AskAQuestion.jsx";
import "../AskAQuestionPage/AskAQuestionPage.css";
import "../AskAQuestion/AskAQuestion.css";

import { useState } from "react";

export default function AskAQuestionPage() {
  const [view, setView] = useState("unanswered");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <main className="ask-a-question-page">
      <h1>Ask A Question</h1>
      <section aria-label="buttons">
        <Button
          className="ask-button"
          onClick={togglePopup}
          variant="contained"
        >
          Click here to ask a question
        </Button>
        <Button
          onClick={() => setView("unanswered")}
          aria-label="Toggle view to list of unanswered questions"
          variant="contained"
        >
          Unanswered Questions
        </Button>
        <Button
          onClick={() => setView("answered")}
          aria-label="Toggle view to list of answered questions"
          variant="contained"
        >
          Answered Questions
        </Button>
      </section>
      <section className="questions-container" aria-label="Questions List">
        {view === "unanswered" ? (
          <UserUnansweredQuestions />
        ) : (
          <UserAnsweredQuestions />
        )}
      </section>
      {/* Pop-up for asking a question */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <AskQuestion close={togglePopup} />
          </div>
        </div>
      )}
    </main>
  );
}
