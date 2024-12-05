import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

export default function AdminHomePageEdit() {
  const history = useHistory();

  const [home, setHome] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [linkHeader, setLinkHeader] = useState();

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

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleLinkHeader = (event) => {
    setLinkHeader(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const data = { title: title, body: body, linkHeader: linkHeader };
    axios
      .put(`/api/home/${home.id}`, data)
      .then(() => {
        history.push("/adminManageResources");
      })
      .catch((error) => {
        console.log("Error updating Home:", error);
      });
  };

  return (
    <Box component={"main"} id="content" tabIndex="-1" sx={{ display: "flex", flexDirection: "column", gap: 4, p: 4 }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Box sx={{ flex: 1 }}>
        <Typography variant="h4" component={"h1"} gutterBottom>
        Edit Home Page
      </Typography>
          <form>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                type="submit"
                onClick={handleSave}
                variant="contained"
              >
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
                Title:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={title}
                onChange={handleTitle}
                variant="outlined"
                placeholder="Enter the page title"
                sx={{ bgcolor: "background.paper" }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Main Page Content:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={body}
                onChange={handleBody}
                variant="outlined"
                placeholder="Enter the main content for the homepage"
                sx={{ bgcolor: "background.paper" }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Header for the Quick Link Section:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={linkHeader}
                onChange={handleLinkHeader}
                variant="outlined"
                placeholder="Enter the header for the quick link section"
                sx={{ bgcolor: "background.paper" }}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
