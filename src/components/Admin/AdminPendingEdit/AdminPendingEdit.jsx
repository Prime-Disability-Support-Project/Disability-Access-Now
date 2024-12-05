import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function AdminPendingEdit() {
  const history = useHistory();
  const [pending, setPending] = useState();
  const [body, setBody] = useState();
  const [email, setEmail] = useState();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get("/api/pending")
      .then((response) => {
        const pendingResponse = response.data[0];
        setPending(pendingResponse);
        setBody(pendingResponse.body);
        setEmail(pendingResponse.email);
      })
      .catch((error) => {
        console.log("Error fetching Pending:", error);
      });
  }, []);

  if (!pending) {
    return <div>Loading...</div>;
  }

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const data = { body: body, email: email, id: pending.id };
    axios
      .put(`/api/pending/${pending.id}`, data)
      .then((response) => {
        history.push("/adminManageResources");
      })
      .catch((error) => {
        console.log("Error updating Pending:", error);
      });
  };

  return (
    <Box component={"main"} id="content" tabIndex="-1" sx={{ display: "flex", flexDirection: "column", gap: 4, p: 4 }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component={"h1"} gutterBottom>
            Edit Pending Approval
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
                Pending Approval Text:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={body}
                onChange={handleBody}
                variant="outlined"
                placeholder="Enter the pending approval content"
                sx={{ bgcolor: "background.paper" }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Contact Email Address:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={email}
                onChange={handleEmail}
                variant="outlined"
                placeholder="Enter the contact email"
                sx={{ bgcolor: "background.paper" }}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
