import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export default function UserUnansweredQuestions() {
  const dispatch = useDispatch();
  const unansweredQuestions = useSelector(
    (store) => store.userQuestions.userUnanswered
  );

  useEffect(() => {
    dispatch({ type: "FETCH_USER_UNANSWERED" });
  }, [dispatch]);

  const handleRead = (questionId) => {
    const data = { questionId: questionId };
    // Assuming a backend endpoint for marking as unread or read
    axios.put("/api/questions/user-unread", data).then(() => {
      dispatch({ type: "FETCH_USER_UNANSWERED" });
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        component={"h1"}
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        Unanswered Questions
      </Typography>
      {unansweredQuestions.length === 0 ? (
        <Typography variant="body1">No unanswered questions found.</Typography>
      ) : (
        <ul style={{ padding: 0, margin: 0 }}>
          {unansweredQuestions.map((question) => (
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
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}
