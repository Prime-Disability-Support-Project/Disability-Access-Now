import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminAddArticle() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [titleInput, setTitleInput] = useState();

  const [subtitle, setSubtitle] = useState();
  const [subtitleInput, setSubtitleInput] = useState();

  const [body, setBody] = useState();
  const [bodyInput, setBodyInput] = useState();


  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubtitle = (event) => {
    setSubtitle(event.target.value);
  };

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleSave = () => {
    const articleData = {
      title: title,
      subtitle: subtitle,
      body: body,
      fileIds: 3
    };
    dispatch({ type: "ADD_ARTICLE", payload: articleData });
    history.push("/adminManageResources");
  };

  // resets the store after they leave the page
  const handleCancel = () => {
    history.goBack();
  };


  return (
    <form>
      <button type="submit" onClick={handleSave}>
        Save New Article
      </button>
      <button type="button" onClick={handleCancel}>
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
        <label htmlFor="subtitle">Subtitle:</label>
        <textarea
          rows="2"
          cols="75"
          type="text"
          name="subtitle"
          value={subtitle}
          onChange={handleSubtitle}
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          rows="20"
          cols="75"
          type="text"
          name="body"
          value={body}
          onChange={handleBody}
        />
      </div>
    </form>
  );
}
