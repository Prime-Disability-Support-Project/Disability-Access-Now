import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./AdminAboutUsEdit.css";

export default function AdminAboutUsEdit() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [aboutUs, setAboutUs] = useState();
  const [title, setTitle] = useState();
  const [founderText, setFounderText] = useState();
  const [devText, setDevText] = useState();

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
    const data = { title: title, founderText: founderText, devText: devText, id: aboutUs.id };
    axios
      .put("/api/about", data)
      .then((response) => {
        history.push("/adminManageResources");
      })
      .catch((error) => {
        console.log("Error updating AboutUs:", error);
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
            <label htmlFor="founder">Text about the Founder:</label>
            <textarea
              rows="15"
              cols="75"
              type="text"
              name="founder"
              value={founderText}
              onChange={handleFounder}
            />
          </div>
          <div>
            <label htmlFor="dev">Text about the Dev Team:</label>
            <textarea
              rows="15"
              cols="75"
              type="text"
              name="dev"
              value={devText}
              onChange={handleDev}
            />
          </div>
        </form>
      </div>
      <div className="preview">
        <h1>Preview:</h1>
        <h1>{title}</h1>
        <Markdown remarkPlugins={[remarkGfm]}>{founderText}</Markdown>
        <Markdown remarkPlugins={[remarkGfm]}>{devText}</Markdown>
      </div>
    </div>
  );
}
