import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from '@mui/material/Button';

export default function AdminPendingEdit() {
  const history = useHistory();
  const [pending, setPending] = useState();
  const [body, setBody] = useState();
  const [email, setEmail] = useState();

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
    <div className="container">
      <div className="editForm">
        <form>
          <Button type="submit" onClick={() => handleSave(event)} variant="contained">
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={() => history.push("/adminManageResources")}
            variant="outlined"
          >
            Cancel
          </Button>
          <div>
            <label htmlFor="body">Pending Approval Text:</label>
            <textarea
              rows="10"
              cols="75"
              type="text"
              name="body"
              value={body}
              onChange={handleBody}
            />
          </div>
          <div>
            <label htmlFor="email">Contact Email Address:</label>
            <textarea
              rows="3"
              cols="75"
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
