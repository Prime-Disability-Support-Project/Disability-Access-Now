import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadPDF from "../../Blob/UploadPDF";

export default function AdminManageResources() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allArticles = useSelector((store) => store.articles.allArticles);
  const allFiles = useSelector((store) => store.files.allFiles);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_ARTICLES" });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_FILES" });
  }, [dispatch]);

  const handleEdit = (articleId) => {
    history.push(`/editArticle/${articleId}`);
  };

  const handleDelete = (articleId) => {
    dispatch({ type: "REMOVE_ARTICLE", payload: articleId });
  };

  const handleDeleteFile = (fileId) => {
    dispatch({ type: "REMOVE_FILE", payload: fileId });
  };

  return (
    <div>
      <h1>Manage Resources</h1>
      <h2>Add New Resources</h2>
      <button onClick={() => history.push("/adminAddArticle")}>
        Add a New Article
      </button>
      <UploadPDF />
      <h2>Choose an Article to Edit</h2>
      <ul>
        {allArticles.map((article) => {
          return (
            <li key={article.id}>
              {article.title}
              <button onClick={() => handleEdit(article.id)}>Edit</button>
              <button onClick={() => handleDelete(article.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <h2>Choose a File to Edit</h2>
      <ul>
        {allFiles.map((file) => {
          return (
            <li key={file.id}>
              {file.filename}
              <button onClick={() => handleDeleteFile(file.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <h2>Edit Site Pages</h2>
      <h3>About Us</h3>
      <button onClick={() => history.push('/editAbout')}>Edit Text</button>
      <button onClick={() => history.push('/editBios')}>Edit Bios</button>
      <h3>Home Page</h3>
      <button onClick={() => history.push('/editHome')}>Edit Content</button>
      <h3>Pending Approval</h3>
      <button onClick={() => history.push('/editPending')}>Edit Content & Email</button>
    </div>
  );
}
