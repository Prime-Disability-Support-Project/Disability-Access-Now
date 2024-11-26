import { useState } from "react";
import React from "react";
import { showOpenFilePicker, showSaveFilePicker } from 'native-file-system-adapter';

// ? used for documentation links

// calls to file access api, which then opens file picker
    // it looks for a valid PDF, buffers the data, and handles error
    // in case title or actual file has some error downloading
    // just a note this only works for updated chrome browser, no firefox/safari support

    // ? for more info check out file access api from google https://shorturl.at/DngHC
    // ? PDF-lib npm docs https://shorturl.at/xKx7Y


async function openFile() {
    // below code is from file access api
    try {
        const [fileHandle] = await showOpenFilePicker({
            types: [
                {
                    description: 'PDF Files',
                    accept: {
                        'application/pdf': ['.pdf'],
                    },
                },
            ],
        });

        const file = await fileHandle.getFile()
        const arrayBuffer = await file.arrayBuffer();
        const title = file.name
        return { fileHandle, file, title }

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('File picker was closed without selecting a file.');
          } else if (error.name === 'NotAllowedError') {
            console.log('File picker is already active.');
          } else if (error.message.includes('No PDF header found')) {
            alert('The selected file is not a valid PDF.');
          } else {
            console.error('An unexpected error occurred:', error);
          }
    }
}


export default function UploadDownload() {
    const [fileHandle, setFileHandle] = useState(null);
    const [fileTitle, setFileTitle] = useState('');
    const [file, setFile] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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

  const openFileHandler = async () => {
    // calls to file access api which gives us access to openFile obj
        // we can make edits to file data if need be

    const result = await openFile();
    if(result){
        const { fileHandle, file, title } = result;
        setFileHandle(fileHandle);
        setFile(file);
        setFileTitle(title);
    }
  };

  const uploadFileHandler = async (event) => {
    event.preventDefault();
    if (file) {
          // file reader obj
      const reader = new FileReader();

        // event handler triggered by file reading complete,
        // result of this is reader.result which is the base64-encoded string
        // then the split separates data into an array,
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
        // sends data to the server
        const response = await fetch('http://localhost:5001/api/files/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename: file.name,
            data: base64data,
          }),
        });
        if (response.ok) {
          alert('File uploaded successfully');
        } else {
          alert('Error uploading file');
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('No file is selected');
    }
  };

  return (
    <div>
      <h1>PDF Title: {fileTitle}</h1>
      <button onClick={openFileHandler}>Open a PDF File</button>
      <button onClick={uploadFileHandler}>Upload New PDF File</button>
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
  );
}