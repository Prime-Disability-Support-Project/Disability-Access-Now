import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function SavedResources() {
  const dispatch = useDispatch();
  const savedArticles = useSelector((store) => store.saved.savedArticles);
  const savedFiles = useSelector((store) => store.saved.savedFiles);

  useEffect(() => {
    dispatch({ type: "FETCH_SAVED_ARTICLES" });
    dispatch({ type: "FETCH_SAVED_FILES" });
  }, [dispatch]);

  const removeArticle = (articleId) => {
    dispatch({ type: "REMOVE_SAVED_ARTICLE", payload: articleId });
  };

  const removeFile = (fileId) => {
    dispatch({ type: "REMOVE_SAVED_FILE", payload: fileId });
  };

  return (
    <Box component="main" sx={{ p: 4 }}>
      <Typography variant="h4" sx={{fontWeight: "bold"}} component={"h1"} gutterBottom>
        Saved Resources
      </Typography>
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" sx={{fontWeight: "bold"}} component={"h2"} gutterBottom>
          Saved Articles
        </Typography>
        <List>
          {savedArticles.map((article) => (
            <ListItem key={article.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText
                primary={<a href={`http://localhost:5173/#/articlePage/${article.id}`}>{article.title}</a>}
              />
              <Button
                onClick={() => removeArticle(article.id)}
                variant="outlined"
                color="error"
                size="small"
              >
                Remove From Bookmarks
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" sx={{fontWeight: "bold"}} component={"h2"} gutterBottom>
          Saved Files
        </Typography>
        <List>
          {savedFiles.map((file) => (
            <ListItem key={file.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary={file.filename} />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  onClick={() => downloadFileHandler(file.filename)}
                  variant="contained"
                  size="small"
                >
                  Download PDF
                </Button>
                <Button
                  onClick={() => removeFile(file.id)}
                  variant="outlined"
                  color="error"
                  size="small"
                >
                  Remove From Bookmarks
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
