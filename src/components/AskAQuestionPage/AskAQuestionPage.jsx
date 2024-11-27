import UserUnansweredQuestions from "../UserUnansweredQuestions/UserUnansweredQuestions";
import UserAnsweredQuestions from "../UserAnsweredQuestions/UserAnsweredQuestions";
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
        <div className="ask-title">
            <h2>Ask A Question</h2>
            <button className="ask-button" onClick={togglePopup}>
                Click here to ask a question
                </button>
            </div>

      <div className="tabs">
        <button onClick={() => setView('unanswered')}>Unanswered Questions</button>
        <button onClick={() => setView('answered')}>Answered Questions</button>
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
                <AskQuestion />
                <button className="close-button" onClick={togglePopup}>
                    Close
                    </button>   
                </div>
            </div>
        )}
        </div>
        </>
  )
}
