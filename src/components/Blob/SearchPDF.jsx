import { useState } from "react";
import React from "react";
import { showOpenFilePicker, showSaveFilePicker } from 'native-file-system-adapter';


export default function SearchPDF({onSearch}){
    const [noSearch, setNoSearch] = useState('')
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    
    const searchHandler = async () => {

          if(onSearch){
        onSearch(searchTerm);
      }

        try {
          const response = await fetch(`http://localhost:5001/api/files/search?keyword=${searchKeyword}`);
          if (response.ok) {
            const results = await response.json();
            setSearchResults(results);
            setNoSearch('No Results')
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

            {searchResults.length > 0 ? 
            (

              <div>
                <h3>Search Results:</h3>
                <ul>
                  
                    {searchResults.map((result) => (
                      <li key={result.id}>
                      {result.filename} <button onClick={() => downloadFileHandler(result.filename)}>Download PDF</button>
                      </li>
                  ))}
                  

                </ul>

              </div>
                



            ) : (<h3>{noSearch}</h3>)}
            
            


              
            
        </div>
    )};