import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function AdminBiosEdit() {
  const history = useHistory();
  const [bios, setBios] = useState([]);
  const [editId, setEditId] = useState(null);

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
      .get("/api/about/bios")
      .then((response) => {
        setBios(response.data);
      })
      .catch((error) => {
        console.log("Error fetching Bios:", error);
      });
  }, []);

  const handleInput = (id, column, value) => {
    setBios((oldBios) =>
      oldBios.map((bio) => (bio.id === id ? { ...bio, [column]: value } : bio))
    );
  };

  const handleSave = (id) => {
    const bioToUpdate = bios.find((bio) => bio.id === id);
    axios
      .put(`/api/about/bios/${id}`, bioToUpdate)
      .then(() => {
        setEditId(null);
      })
      .catch((error) => {
        console.log("Error updating bio:", error);
      });
  };

  return (
    <Box
      component={"main"}
      id="content"
      tabIndex="-1"
      sx={{ display: "flex", flexDirection: "column", gap: 4, p: 4 }}
    >
      <Typography variant="h4" component={"h1"} gutterBottom>
        Edit Bios
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          type="button"
          onClick={() => history.push("/adminManageResources")}
          variant="outlined"
        >
          Cancel
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {bios.map((bio) => (
          <Box
            key={bio.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: "background.paper",
            }}
          >
            {editId === bio.id ? (
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Button
                    type="button"
                    onClick={() => handleSave(bio.id)}
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setEditId(null)}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Name:
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={bio.name}
                    onChange={(e) =>
                      handleInput(bio.id, "name", e.target.value)
                    }
                    variant="outlined"
                    placeholder="Enter the name"
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Bio (optional):
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={10}
                    value={bio.bio}
                    onChange={(e) => handleInput(bio.id, "bio", e.target.value)}
                    variant="outlined"
                    placeholder="Enter bio text"
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Link (optional):
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={bio.link}
                    onChange={(e) =>
                      handleInput(bio.id, "link", e.target.value)
                    }
                    variant="outlined"
                    placeholder="Enter link"
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{bio.name}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {bio.bio}
                </Typography>
                {bio.link && (
                  <a
                    href={bio.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", color: "blue" }}
                  >
                    {bio.link}
                  </a>
                )}
                <Button
                  type="button"
                  onClick={() => setEditId(bio.id)}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Edit
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
