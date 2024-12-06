import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
        Answered Questions
      </Typography>
      {answeredQuestions.length === 0 ? (
        <Typography variant="body1">No answered questions found.</Typography>
      ) : (
        <ul style={{ padding: 0, margin: 0 }}>
          {answeredQuestions.map((question) => (
            <li key={question.id} style={{ marginBottom: 16 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Question:</strong> {question.question}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Answer:</strong> {question.answer}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Date Submitted:</strong> {question.question_date.split("T")[0]}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Associated Article:</strong>{" "}
                    {question.associated_article_url ? (
                      <a href={question.associated_article_url}>
                        {question.associated_article_url}
                      </a>
                    ) : (
                      "No article was associated with this question"
                    )}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {question.unread === true ? (
                      <Button
                        onClick={() => handleRead(question.id)}
                        variant="contained"
                        color="primary"
                        aria-label={`Mark question ${question.id} as read`}
                      >
                        Mark as Read
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleRead(question.id)}
                        variant="outlined"
                        aria-label={`Mark question ${question.id} as unread`}
                      >
                        Mark as Unread
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}
