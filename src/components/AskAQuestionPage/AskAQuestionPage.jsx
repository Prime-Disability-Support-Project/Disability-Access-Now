import UserUnansweredQuestions from "../UserUnansweredQuestions/UserUnansweredQuestions";
import UserAnsweredQuestions from "../UserAnsweredQuestions/UserAnsweredQuestions";

import { useState } from "react";

export default function AskAQuestionPage() {
  const [view, setView] = useState("unanswered");
  return (
    <div>
      <div>
        <button onClick={() => setView('unanswered')}>Unanswered Questions</button>
        <button onClick={() => setView('answered')}>Answered Questions</button>
      </div>
      <div>
        {view === "unanswered" ? <UserUnansweredQuestions /> : <UserAnsweredQuestions />}
      </div>
    </div>
  );
}
