import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import axios from "axios";

export default function AdminBiosEdit() {
  const history = useHistory();
  const [bios, setBios] = useState([]);
  const [editId, setEditId] = useState(null);

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

  // sorts through the bios array to find the bio whose input got changed
  // spreads and updates the specific column (name, bio, link)
  const handleInput = (id, column, value) => {
    setBios((oldBios) =>
      oldBios.map((bio) => (bio.id === id ? { ...bio, [column]: value } : bio))
    );
  };

  const handleSave = (id) => {
    // find the bio that was clicked on
    const bioToUpdate = bios.find((bio) => bio.id === id);
    axios
      .put(`/api/about/bios/${id}`, bioToUpdate)
      .then(() => {
        // resets the conditional
        setEditId(null);
      })
      .catch((error) => {
        console.log("Error updating bio:", error);
      });
  };

  return (
    <div>
      <Button
        type="button"
        onClick={() => history.push("/adminManageResources")}
        variant="contained"
      >
        Back to Manage Resources
      </Button>
      <form>
        {bios.map((bio) => (
          <div key={bio.id}>
            {editId === bio.id ? (
              <div>
                <Button type="button" onClick={() => handleSave(bio.id)} variant="contained">
                  Save Changes
                </Button>
                <Button type="button" onClick={() => setEditId(null)} variant="outlined">
                  Cancel
                </Button>
                <div>
                  <label htmlFor="name">Name:</label>
                  <textarea
                    rows="2"
                    cols="75"
                    name="name"
                    value={bio.name}
                    onChange={(e) =>
                      handleInput(bio.id, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="bio">Bio {`(optional)`}:</label>
                  <textarea
                    rows="15"
                    cols="75"
                    name="bio"
                    value={bio.bio}
                    onChange={(e) =>
                      handleInput(bio.id, "bio", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="link">Link {`(optional)`}:</label>
                  <textarea
                    rows="2"
                    cols="75"
                    name="link"
                    value={bio.link}
                    onChange={(e) =>
                      handleInput(bio.id, "link", e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3>{bio.name}</h3>
                <p>{bio.bio}</p>
                <a href={bio.link} target="_blank" rel="noopener noreferrer">
                  {bio.link}
                </a>
                <Button type="button" onClick={() => setEditId(bio.id)} variant="contained">
                  Edit
                </Button>
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
