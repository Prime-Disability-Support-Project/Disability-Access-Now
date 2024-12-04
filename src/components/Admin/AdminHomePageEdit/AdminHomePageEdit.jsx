import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function AdminHomePageEdit() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [home, setHome] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [linkHeader, setLinkHeader] = useState();

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
    console.log('data', data)
    axios
      .put(`/api/home/${home.id}`, data)
      .then((response) => {
        history.push("/adminManageResources");
      })
      .catch((error) => {
        console.log("Error updating Home:", error);
      });
  };

  return (
    <div className="container">
      <div className="editForm">
        <form>
          <button type="submit" onClick={() => handleSave(event)}>
            Save Changes
          </button>
          <button type="button" onClick={() => history.push('/adminManageResources')}>
            Cancel
          </button>
          <div>
            <label htmlFor="title">Title:</label>
            <textarea
              rows="2"
              cols="75"
              type="text"
              name="title"
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div>
            <label htmlFor="text">Main Home Page Text:</label>
            <textarea
              rows="15"
              cols="75"
              type="text"
              name="text"
              value={body}
              onChange={handleBody}
            />
          </div>
          <div>
            <label htmlFor="link">Header for the Quick Link Section:</label>
            <textarea
              rows="15"
              cols="75"
              type="text"
              name="link"
              value={linkHeader}
              onChange={handleLinkHeader}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
