import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./AdminAnsweredQuestion.css";

export default function AdminAnsweredQuestions() {
  const dispatch = useDispatch();
  const answeredQuestions = useSelector(
    (store) => store.adminQuestions.adminAnswered || []
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_ANSWERED" });
  }, [dispatch]);

  const handleDeleteQuestion = (questionId) => {
    axios.delete(`/api/questions/${questionId}`).then(() => {
      dispatch({ type: "FETCH_ADMIN_ANSWERED" });
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Answered Questions
      </Typography>
      {answeredQuestions.length === 0 ? (
        <Typography variant="body1">No answered questions found.</Typography>
      ) : (
        <ul style={{ padding: 0, margin: 0 }}>
          {answeredQuestions.map((question) => (
            <li key={question.id} style={{ marginBottom: 16 }}>
              <Card sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Question:</strong> {question.question}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Answer:</strong> {question.answer}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Date Submitted:</strong> {question.question_date}
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
                    <Button
                      onClick={() => handleDeleteQuestion(question.id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete Question
                    </Button>
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
