import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "./AdminAddArticle.css";

export default function AdminAddArticle() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [body, setBody] = useState();

  const allFiles = useSelector((store) => store.files.allFiles);

  const [selectedFiles, setSelectedFiles] = useState();

  const handleSelection = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedFiles(selectedValues);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_FILES" });
  }, [dispatch]);

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
      fileIds: selectedFiles,
    };
    dispatch({ type: "ADD_ARTICLE", payload: articleData });
    history.push("/adminManageResources");
  };

  // resets the store after they leave the page
  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className="container">
      <div className="inputForm">
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
            <label htmlFor="body">Body {`(markdown)`}:</label>
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
        <form>
          <label htmlFor="files">
            Choose files to associate with this article:
          </label>
          <select
            onChange={handleSelection}
            name="files"
            id="files"
            multiple={true}
          >
            {allFiles.map((file) => {
              return <option value={file.id}>{file.filename}</option>;
            })}
          </select>
        </form>
        <h3 className="note">
          Note for my devs - use command click to select multiple options and
          also to unselect options. We can swap this out with an npm package if
          we want it to look nice 😺
        </h3>
      </div>
      <div className="preview">
        <h1>Preview of the Article Body:</h1>
        <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
      </div>
    </div>
  );
}
