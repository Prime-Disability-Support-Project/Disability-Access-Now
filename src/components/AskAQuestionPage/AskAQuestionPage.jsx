import UserUnansweredQuestions from "../UserUnansweredQuestions/UserUnansweredQuestions";
import UserAnsweredQuestions from "../UserAnsweredQuestions/UserAnsweredQuestions";
import Button from '@mui/material/Button';
import AskQuestion from "../AskAQuestion/AskAQuestion.jsx";
import "../AskAQuestionPage/AskAQuestionPage.css"
import '../AskAQuestion/AskAQuestion.css'

import { useState } from "react";

export default function AskAQuestionPage() {
  const [view, setView] = useState("unanswered");
  const [showPopup, setShowPopup] = useState(false); 

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  return (
    <>
        <div className="ask-a-question-page">
        <h1>Ask A Question</h1>
        <div className="ask-title">
            <Button className="ask-button" onClick={togglePopup} variant="contained">
                Click here to ask a question
                </Button>
            </div>

      <div className="tabs">
        <Button onClick={() => setView('unanswered')} aria-label="Toggle view to list of unanswered questions" variant="outlined">Unanswered Questions</Button>
        <Button onClick={() => setView('answered')} aria-label="Toggle view to list of answered questions" variant="outlined">Answered Questions</Button>
      </div>
      <div className="questions-list">
        {view === "unanswered" ? (
            <UserUnansweredQuestions />
        ) : (
            <UserAnsweredQuestions />
        )}
        </div>
        {/* Pop-up for asking a question */}
        {showPopup && (
            <div className="popup-container">
            <div className="popup-content">
                <AskQuestion close={togglePopup} /> 
                </div>
            </div>
        )}
        </div>
        </>
  )
}
