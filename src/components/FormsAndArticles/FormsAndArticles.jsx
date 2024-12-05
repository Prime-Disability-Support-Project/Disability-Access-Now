import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import ArticleList from "../ArticleList/ArticleList";
import FilesList from "../FilesList/FilesList";

export default function SavedResources() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_SAVED_ARTICLES" });
    dispatch({ type: "FETCH_SAVED_FILES" });
  }, [dispatch]);

  return (
    <Box component="main" sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
        component={"h1"}
        gutterBottom
      >
        Forms and Articles
      </Typography>
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          component={"h2"}
          gutterBottom
          aria-label="Below is a list of all available articles"
        >
          Articles
        </Typography>
        <ArticleList />
      </Box>
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          component={"h2"}
          gutterBottom
          aria-label="Below is a list of all downloadable files"
        >
          Forms & Files
        </Typography>
        <FilesList />
      </Box>
    </Box>
  );
}
