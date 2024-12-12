import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AdminAboutUsEdit() {
  const history = useHistory();

  const [aboutUs, setAboutUs] = useState();
  const [title, setTitle] = useState();
  const [founderText, setFounderText] = useState();
  const [devText, setDevText] = useState();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get("/api/about")
      .then((response) => {
        const aboutResponse = response.data[0];
        setAboutUs(aboutResponse);
        setTitle(aboutResponse.title);
        setFounderText(aboutResponse.founderText);
        setDevText(aboutResponse.devText);
      })
      .catch((error) => {
        console.log("Error fetching AboutUs:", error);
      });
  }, []);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleFounder = (event) => {
    setFounderText(event.target.value);
  };

  const handleDev = (event) => {
    setDevText(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const data = {
      title: title,
      founderText: founderText,
      devText: devText,
      id: aboutUs.id,
    };
    axios
      .put("/api/about", data)
      .then(() => {
        history.push("/adminManageResources");
      })
      .catch((error) => {
        console.log("Error updating AboutUs:", error);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 4, p: 4 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" component={"h1"} gutterBottom>
          Edit About Us
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button type="submit" onClick={handleSave} variant="contained">
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={() => history.push("/adminManageResources")}
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Title (header of the page):
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={title}
            onChange={handleTitle}
            variant="outlined"
            placeholder="Enter the title"
            sx={{ bgcolor: "background.paper" }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            About the Founder (use markdown):
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={15}
            value={founderText}
            onChange={handleFounder}
            variant="outlined"
            placeholder="Enter text about the founder"
            sx={{ bgcolor: "background.paper" }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            About the Dev Team (use markdown):
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={15}
            value={devText}
            onChange={handleDev}
            variant="outlined"
            placeholder="Enter text about the dev team"
            sx={{ bgcolor: "background.paper" }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Preview:
        </Typography>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Markdown remarkPlugins={[remarkGfm]}>{founderText}</Markdown>
        <Markdown remarkPlugins={[remarkGfm]}>{devText}</Markdown>
      </Box>
    </Box>
  );
}
