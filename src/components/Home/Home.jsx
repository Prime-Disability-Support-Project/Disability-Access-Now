import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

import { Container, Grid, Paper, Typography, Button } from '@mui/material';


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
    <main id="content">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h2" gutterBottom fontWeight={'bold'}>
                Welcome to Disability Access Now
              </Typography>
              <Typography variant="body1">
                Disability Access Now is your guide to navigating the disability benefits process in Minnesota. Our mission is to simplify your journey by providing a centralized hub for resources, tips, step-by-step guides, and essential information on applying for benefits, gathering required documents, and handling denials. Need personalized advice? Ask our admins—real people ready to provide clear, tailored answers. Please note, we are not affiliated with any government agency; but we're here to support you every step of the way.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" gutterBottom fontWeight={'bold'}>
                Not sure where to start? Check out these frequently used resources below:
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
                Start with Forms
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
