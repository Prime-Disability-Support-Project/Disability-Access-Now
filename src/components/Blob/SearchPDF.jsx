import { useState } from "react";
import React from "react";
import { showOpenFilePicker, showSaveFilePicker } from 'native-file-system-adapter';
const [searchKeyword, setSearchKeyword] = useState('');
const [searchResults, setSearchResults] = useState([]);


export default function SearchPDF(){

    const searchHandler = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/files/search?keyword=${searchKeyword}`);
          if (response.ok) {
            const results = await response.json();
            setSearchResults(results);
          } else {
            alert('Error Searching for Files!');
          }
        } catch (error) {
          console.error('Unexpected error searching for files:', error);
          alert('Unexpected error searching for files!');
        }
      };


      const downloadFileHandler = async (filename) => {
        try {
            // fetch file from server
          const response = await fetch(`http://localhost:5001/api/files/download/${filename}`);
          if (response.ok) {
            // converts response to a blob
            const blob = await response.blob();
    
            // create a URL for blob
            const url = window.URL.createObjectURL(blob);
            
            // creates a download link
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
    
            // append link to doc and click it, remove it
            document.body.appendChild(link);
            link.click();
            link.remove();
          } else {
            alert('Error Downloading File');
          }
        } catch (error) {
          console.error('Unexpected Error:  ', error);
          alert('Error Downloading File');
        }
      };

    return (
        <div>
            <div>
                <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search for PDFs"
                />
                <button onClick={searchHandler}>Search PDF Files</button>
            </div>
            <div>
                <h2>Search Results:</h2>
                    <ul>
                    {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <li key={result.id}>
                        {result.filename} <button onClick={() => downloadFileHandler(result.filename)}>Download PDF</button>
                        </li>
                    ))
                    ) : (
                    <p>No results found</p>
                    )}
                    </ul>
            </div>
        </div>
    )};