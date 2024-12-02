import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { downloadFileHandler } from "../Blob/downloadFile"; // util function for downloading pdf files

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
    <div>
      <h2>Search Results for "{query}":</h2>
      <h3>Articles:</h3>
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
      <h3>Files:</h3>
      {fileResults.length > 0 ? (
        <ul>
          {fileResults.map((result) => (
            <li key={result.id}>
              {result.name}
              <button onClick={() => downloadFileHandler(result.name)}>
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results found in files.</p>
      )}
    </div>
  );
};

export default SearchResults;
