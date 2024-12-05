import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files
import Button from "@mui/material/Button";

const SearchResults = () => {
  const [fileResults, setFileResults] = useState([]);
  const [articleResults, setArticleResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/files/search?keyword=${query}`
        );
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
    <main>
      <h1>Search Results for "{query}":</h1>
      <h2>Articles:</h2>
      {articleResults.length > 0 ? (
        <ul>
          {articleResults.map((result) => (
            <li key={result.id}>
              <a href={`http://localhost:5173/#/articlePage/${result.id}`}>
                {result.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results found in articles.</p>
      )}
      <h2>Files:</h2>
      {fileResults.length > 0 ? (
        <ul>
          {fileResults.map((result) => (
            <li key={result.id}>
              {result.name}
              <Button
                onClick={() => downloadFileHandler(result.name)}
                variant="contained"
              >
                Download PDF
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results found in files.</p>
      )}
    </main>
  );
};

export default SearchResults;
