import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import UploadPDF from "../../Blob/UploadPDF";
import Swal from "sweetalert2";


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
    Swal.fire({
        title: 'Are you sure?',
        text: "Once deleted, you won't be able to recover this article!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "REMOVE_ARTICLE", payload: articleId });
        Swal.fire(
          'Deleted!',
          'The article has been deleted.',
          'success'
        );
      }
    });
  }


  const handleDeleteFile = (fileId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Once deleted, you won't be able to recover this file!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "REMOVE_FILE", payload: fileId });
        Swal.fire(
          'Deleted!',
          'The file has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <Box component="main" id="content" tabIndex="-1" sx={{ padding: 4 }}>
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Manage Resources
      </Typography>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography
            component="h2"
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Add New Resources
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                onClick={() => history.push("/adminAddArticle")}
                variant="contained"
              >
                Add a New Article
              </Button>
            </Grid>
            <Grid item>
              <UploadPDF />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography
            component="h2"
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Choose an Article to Edit
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {allArticles.map((article) => (
              <li key={article.id}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ marginBottom: 2 }}
                >
                  <Typography component="p" variant="body1">
                    {article.title}
                  </Typography>
                  <Box>
                    <Button
                      onClick={() => handleEdit(article.id)}
                      variant="contained"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(article.id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography
            component="h2"
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Delete a File
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {allFiles.map((file) => (
              <li key={file.id}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ marginBottom: 2 }}
                >
                  <Typography component="p" variant="body1">
                    {file.filename}
                  </Typography>
                  <Button
                    onClick={() => handleDeleteFile(file.id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </Grid>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography
            component="h2"
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Edit Site Pages
          </Typography>
          <Typography component="h3" variant="h6" sx={{ fontWeight: "bold" }}>
            About Us
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Button
                onClick={() => history.push("/editAbout")}
                variant="contained"
                sx={{ marginRight: 1 }}
              >
                Edit Text
              </Button>
              <Button
                onClick={() => history.push("/editBios")}
                variant="contained"
              >
                Edit Bios
              </Button>
            </li>
          </ul>
          <Typography
            component="h3"
            variant="h6"
            sx={{ fontWeight: "bold", marginTop: 2 }}
          >
            Home Page
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Button
                onClick={() => history.push("/editHome")}
                variant="contained"
              >
                Edit Content
              </Button>
            </li>
          </ul>
          <Typography
            component="h3"
            variant="h6"
            sx={{ fontWeight: "bold", marginTop: 2 }}
          >
            Pending Approval
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Button
                onClick={() => history.push("/editPending")}
                variant="contained"
              >
                Edit Content & Email
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
}
