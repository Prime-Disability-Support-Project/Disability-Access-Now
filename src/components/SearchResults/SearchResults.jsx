import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DownloadPDF from '../Blob/DownloadPDF';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/files/search?keyword=${query}`);
        if (response.ok) {
          const results = await response.json();
          setSearchResults(results);
        } else {
          alert('Error Searching for Files!');
        }
      } catch (error) {
        console.error('Unexpected Error Searching for Files:', error);
        alert('Unexpected Error Searching for Files!');
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);



  return (
    <div>
      <h2>Search Results for "{query}":</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              {result.filename} <button onClick={() => DownloadPDF(result.filename)}>Download PDF</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
};

export default SearchResults;