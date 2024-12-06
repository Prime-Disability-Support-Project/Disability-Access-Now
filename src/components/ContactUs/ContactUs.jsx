import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import "./ContactUs.css";

function Contact() {
  const [pending, setPending] = useState();

  useEffect(() => {
    axios
      .get("/api/pending")
      .then((response) => {
        const pendingResponse = response.data;
        setPending(pendingResponse[0]);
      })
      .catch((error) => {
        console.log("Error fetching Pending:", error);
      });
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  if (!pending) {
    return <div>Loading...</div>;
  }

  return (
    <Box component="main" id="content" tabIndex="-1" sx={{ p: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Contact Us
      </Typography>
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
          Disclaimer:
        </Typography>
        <Typography sx={{ marginBottom: "1rem" }}>
          Please be aware that we are not the Social Security Administration
          (SSA) or any other government agency. We are not a healthcare
          organization and are not subject to HIPAA regulations.
        </Typography>
        <Typography sx={{ marginBottom: "1rem" }}>
          <strong>
            We do not handle private or sensitive information such as your full
            legal name, address, Social Security number, or any other
            confidential personal details.
          </strong>
        </Typography>
        <Typography sx={{ marginBottom: "1rem" }}>
          We kindly ask that you do not send any personal or private information
          to us. While we are committed to maintaining the privacy of the
          information you share, we do not make decisions regarding Social
          Security or other cases, nor do we have access to case-specific
          details or records.
        </Typography>
        <Typography sx={{ marginBottom: "1rem" }}>
          You can contact us with any questions at{" "}
          <a href={`mailto:${pending.email}`}>{pending.email}</a>.
        </Typography>
        <Typography>Thank you for your understanding.</Typography>
      </Box>
    </Box>
  );
}

export default Contact;
