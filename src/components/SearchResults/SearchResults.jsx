import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const SearchResults = () => {
  const [fileResults, setFileResults] = useState([]);
  const [articleResults, setArticleResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/files/search?keyword=${query}`);
        if (response.ok) {
          const results = await response.json();
          // searches both files and articles tables
          // results structure: {id: id, name: filename or title, type: file or article}
          const files = results.filter((item) => item.type === "file");
          const articles = results.filter((item) => item.type === "article");
          setFileResults(files);
          setArticleResults(articles);
        } else {
          alert("Error Searching!");
        }
      } catch (error) {
        console.error("Unexpected Error Searching:", error);
        alert("Unexpected Error Searching!");
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <Box component="main" id="content" tabIndex="-1" sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
        component={"h1"}
        gutterBottom
      >
        Search Results for "{query}":
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
        >
          Articles{" "}
        </Typography>{" "}
        {articleResults.length > 0 ? (
          <List>
            {articleResults.map((result) => (
              <ListItem
                key={result.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={
                    <Link to={`/articlePage/${result.id}`}>{result.name}</Link>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No search results found in articles.</p>
        )}
      </Box>
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
        >
          Files{" "}
        </Typography>{" "}
        {fileResults.length > 0 ? (
          <List>
            {fileResults.map((result) => (
              <ListItem
                key={result.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText primary={result.name} />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    onClick={() => downloadFileHandler(result.name)}
                    variant="contained"
                    size="small"
                  >
                    Download PDF
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No search results found in files.</p>
        )}
      </Box>
    </Box>
  );
};

export default SearchResults;
