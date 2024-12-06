import UserUnansweredQuestions from "../UserUnansweredQuestions/UserUnansweredQuestions";
import UserAnsweredQuestions from "../UserAnsweredQuestions/UserAnsweredQuestions";
import Button from "@mui/material/Button";
import AskQuestion from "../AskAQuestion/AskAQuestion.jsx";
import { Box, Typography, Container } from "@mui/material";
import { useState } from "react";
import "../AskAQuestionPage/AskAQuestionPage.css";
import "../AskAQuestion/AskAQuestion.css";

export default function AskAQuestionPage() {
  const [view, setView] = useState("unanswered");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <main id="content" tabIndex="-1" className="ask-a-question-page">
      <Container sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          Ask A Question
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <Button
            onClick={togglePopup}
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Click here to ask a question
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <Button
            onClick={() => setView("unanswered")}
            variant={view === "unanswered" ? "contained" : "outlined"}
            sx={{ flexGrow: 1 }}
            aria-label="Toggles view of unanswered questions list"
          >
            Unanswered Questions
          </Button>
          <Button
            onClick={() => setView("answered")}
            variant={view === "answered" ? "contained" : "outlined"}
            sx={{ flexGrow: 1 }}
            aria-label="Toggles view of answered questions list"
          >
            Answered Questions
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {view === "unanswered" ? (
            <UserUnansweredQuestions />
          ) : (
            <UserAnsweredQuestions />
          )}
        </Box>

        {/* Pop-up for asking a question */}
        {showPopup && (
          <div className="popup-container">
            <div className="popup-content">
              <AskQuestion close={togglePopup} />
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
