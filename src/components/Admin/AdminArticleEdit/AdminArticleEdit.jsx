import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminArticleEdit() {
  const history = useHistory();
  const dispatch = useDispatch();

  const specificArticle = useSelector(
    (store) => store.articles.specificArticle
  );

  const [title, setTitle] = useState(specificArticle.title);
  const [subtitle, setSubtitle] = useState(specificArticle.subtitle);
  const [body, setBody] = useState(specificArticle.body);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubtitle = (event) => {
    setSubtitle(event.target.value);
  };

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleSave = (articleId) => {
    const articleData = {
      articleId: articleId,
      title: title,
      subtitle: subtitle,
      body: body,
    };
    dispatch({ type: "EDIT_ARTICLE", payload: articleData });
    dispatch({ type: "RESET_SPECIFIC_ARTICLE" });
    history.goBack();
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
  }, []);

  // waits for the specificArticle store to be filled, then sets initial values
  useEffect(() => {
    if (specificArticle) {
      setTitle(specificArticle.title);
      setSubtitle(specificArticle.subtitle);
      setBody(specificArticle.body);
    }
  }, [specificArticle]);

  return (
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
