import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "./AdminArticleEdit.css";

export default function AdminArticleEdit() {
  const history = useHistory();
  const dispatch = useDispatch();

  const specificArticle = useSelector(
    (store) => store.articles.specificArticle
  );

  const associatedFiles = useSelector((store) => store.files.associatedFiles);
  const allFiles = useSelector((store) => store.files.allFiles);

  const [selectedFiles, setSelectedFiles] = useState();

  const handleSelection = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedFiles(selectedValues);
  };

  const handleAssociated = (e) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_ASSOCIATED",
      payload: { articleId: specificArticle.id, fileIds: selectedFiles },
    });
    dispatch({ type: "FETCH_ASSOCIATED_FILES", payload: specificArticle.id });
  };

  const [title, setTitle] = useState(specificArticle.title);
  // const [subtitle, setSubtitle] = useState(specificArticle.subtitle);
  const [body, setBody] = useState(specificArticle.body);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  // const handleSubtitle = (event) => {
  //   setSubtitle(event.target.value);
  // };

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleSave = (articleId) => {
    const articleData = {
      articleId: articleId,
      title: title,
      // subtitle: null,
      body: body,
    };
    dispatch({ type: "EDIT_ARTICLE", payload: articleData });
    dispatch({ type: "RESET_SPECIFIC_ARTICLE" });
    history.push("/adminManageResources");
  };

  // resets the store after they leave the page
  const handleCancel = () => {
    dispatch({ type: "RESET_SPECIFIC_ARTICLE" });
    history.goBack();
  };

  // fetches the specific article using the articleId in the url
  useEffect(() => {
    const url = window.location.href;
    const articleId = url.split("/").pop();
    dispatch({
      type: "FETCH_SPECIFIC_ARTICLE",
      payload: articleId,
    });
    dispatch({ type: "FETCH_ASSOCIATED_FILES", payload: articleId });
    dispatch({ type: "FETCH_ALL_FILES" });
  }, []);

  // waits for the specificArticle store to be filled, then sets initial values
  useEffect(() => {
    if (specificArticle) {
      setTitle(specificArticle.title);
      // setSubtitle(specificArticle.subtitle);
      setBody(specificArticle.body);
    }
  }, [specificArticle]);

  return (
    <div className="container">
      <div className="editForm">
        <form>
          <button type="submit" onClick={() => handleSave(specificArticle.id)}>
            Save Changes
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
          {/* <div>
            <label htmlFor="subtitle">Subtitle:</label>
            <textarea
              rows="2"
              cols="75"
              type="text"
              name="subtitle"
              value={subtitle}
              onChange={handleSubtitle}
            />
          </div> */}
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
        <h3>Current Associated Files:</h3>
        <ul className="files">
          {associatedFiles.map((file) => {
            return <li key={file.id}>{file.filename}</li>;
          })}
        </ul>
        <h3>
          Choose New Files to Associate &#40;these will replace the current
          associated files&#41;
        </h3>
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
          <button onClick={handleAssociated} type="submit">
            Save Changes to Associated Files
          </button>
        </form>
        <h3 className="note">
          Note for my devs - use command click to select multiple options and
          also to unselect options. We can swap this out with an npm package if
          we want it to look nice 😺
        </h3>
      </div>
      <div className="preview">
        <h1>Preview:</h1>
        <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
      </div>
    </div>
  );
}
