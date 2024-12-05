import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
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
      <Button onClick={() => history.push("/adminAddArticle")} variant="contained">
        Add a New Article
      </Button>
      <UploadPDF />
      <h2>Choose an Article to Edit</h2>
      <ul>
        {allArticles.map((article) => {
          return (
            <li key={article.id}>
              {article.title}
              <Button onClick={() => handleEdit(article.id)} variant="contained">Edit</Button>
              <Button onClick={() => handleDelete(article.id)} variant="outlined">Delete</Button>
            </li>
          );
        })}
      </ul>
      <h2>Delete a File</h2>
      <ul>
        {allFiles.map((file) => {
          return (
            <li key={file.id}>
              {file.filename}
              <Button onClick={() => handleDeleteFile(file.id)} variant="outlined">Delete</Button>
            </li>
          );
        })}
      </ul>
      <h2>Edit Site Pages</h2>
      <h3>About Us</h3>
      <Button onClick={() => history.push('/editAbout')} variant="contained">Edit Text</Button>
      <Button onClick={() => history.push('/editBios')} variant="contained">Edit Bios</Button>
      <h3>Home Page</h3>
      <Button onClick={() => history.push('/editHome')} variant="contained">Edit Content</Button>
      <h3>Pending Approval</h3>
      <Button onClick={() => history.push('/editPending')} variant="contained">Edit Content & Email</Button>
    </div>
  );
}
