import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

import { Container, Grid, Paper, Typography, Button } from "@mui/material";

export default function Home() {
  const [home, setHome] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkHeader, setLinkHeader] = useState("");

  useEffect(() => {
    axios
      .get("/api/home")
      .then((response) => {
        const homeResponse = response.data[0];
        setHome(homeResponse);
        setTitle(homeResponse.title);
        setBody(homeResponse.body);
        setLinkHeader(homeResponse.linkHeader);
      })
      .catch((error) => {
        console.log("Error fetching Home content:", error);
      });
  }, []);

  return (
    <main id="content" tabIndex="-1">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h3" component={"h1"} gutterBottom fontWeight={"bold"}>
                {title}
              </Typography>
              <Typography variant="body1">{body}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h4" component={"h2"} gutterBottom fontWeight={"bold"}>
                {linkHeader}
              </Typography>
              <Button
                component={Link}
                to="/userQuestions"
                variant="contained"
                color="primary"
                fullWidth
                aria-label="Ask a Question"
              >
                Ask a Question
              </Button>
              <Button
                component={Link}
                to="/eligible"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                aria-label="Check Eligibility"
              >
                Check Eligibility
              </Button>
              <Button
                component={Link}
                to="/faqs"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                aria-label="Frequently Asked Questions"
              >
                FAQs
              </Button>
              <Button
                component={Link}
                to="/formsYouShouldStartWith"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                aria-label="Start with Forms"
              >
                Start with These Forms
              </Button>
              <Button
                component={Link}
                to="/formsAndArticles"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                aria-label="All Forms And Articles"
              >
                All Forms and Articles
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
