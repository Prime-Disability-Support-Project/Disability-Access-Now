import { useEffect, useState } from "react";
import React from "react";
import { PDFDocument } from "pdf-lib"; // npm i pdf-lib
import { useDispatch } from "react-redux";
// ? used for documentation links

// calls to file access api, which then opens file picker
    // it looks for a valid PDF, buffers the data, and handles error
    // in case title or actual file has some error downloading
    // just a note this only works for updated chrome browser, no firefox/safari support

    // ? for more info check out file access api from google https://shorturl.at/DngHC
    // ? PDF-lib npm docs https://shorturl.at/xKx7Y
    async function openFile(){
        
        // below code is from file access api
        try {
            const [fileHandle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: 'PDF Files',
                        accept: {
                            'application/pdf': ['.pdf'],
                        },
                    },
                ],
            });

            const file = await fileHandle.getFile();
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            const title = file.name;
            return { fileHandle, file, title };

        } catch (error) {
            if(error.name === 'AbortError'){
                console.error('File Picker was closed without selecting a file');
            } else if(error.name === 'NotAllowedError'){
                console.error('File Picker is already active');
            } else if(error.message.includes('No PDF header found')){
                alert('The selected file is not a valid PDF');
            } else {
                console.error('An Unexpected Error Occurred', error);
            }
        }
    };



    async function saveFile(fileHandle, contents) {
        const writable = await fileHandle.createWritable();
        await writable.write(contents);
        await writable.close();
    }

export default function UploadDownload(){
    const [count, setCount] = useState(0);
    const [fileHandle, setFileHandle] = useState(null);
    const [fileTitle, setFileTitle] = useState('');
    const [file, setFile] = useState(null);
    // unused now will be added to article
    const [articleId, setArticleId] = useState(1);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const openFileHandler = async () => {
        const result = await openFile();

        // calls to file access api which gives us access to openFile obj
        // we can make edits to file data if need be
        if(result){
            const { fileHandle, file, title } = result;
            setFileHandle(fileHandle);
            setFileTitle(title);
            setFile(file);
        }
    };


    const uploadFileHandler = async () => {
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
                // eventually we'll want to attach articles_id here

                // server response handler
                response.ok ? alert('Successful File Upload') : alert('Error Uploading File')
            };
            reader.readAsDataURL(file);
        } else {
            alert('No File Selected');
        }
    };


    const downloadFileHandler = async (id) => { 
        
        try {
            // fetch file from server
            const response = await fetch(`http://localhost:5001/files/download/${id}`);
            if(response.ok){
                // converts response to a blob
                const blob = await response.blob();
               
                // create a URL for blob
                const url = window.URL.createObjectURL(blob);
                
                // creates a download link
                const link = document.createElement('a');
                link.href = url;

                // set download file name
                const contentDisposition = response.headers.get('Content-Disposition');
                const fileName = contentDisposition ? contentDisposition.split('fileName=')[1].replace(/"/g, '') : `${fileTitle}`
                link.setAttribute('download', fileName);
                
                // append link to doc and click it, 
                document.body.appendChild(link);
                link.click();
                // remove the link
                link.remove();
            } else {
                alert('Error Downloading File');
            }

        } catch (error) {
            console.error('Unexpected Error:  ', error);
            alert('Error Downloading File');
        }
    };


    const searchHandler = async () => {
        console.log('CLICKED')
        try {
            const response = await fetch(`http://localhost:5001/api/files/search?keyword=${searchKeyWord}`);
            if(response.ok){
                const results = await response.json();
                setSearchResults(results);
                console.log('Search Res', results)
            } else {
                alert('Error Searching for Files!');
            }
        } catch (error) {
            console.error('Unexpected Error Searching for Files  :', error);
            alert('Unexpected Error Searching for Files!');
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
                value={searchKeyWord}
                onChange={(e) => setSearchKeyWord(e.target.value)}
                placeholder="Search for PDFs"
                />
                <button onClick={searchHandler}>Search PDF Files</button>
            </div>
            <div>
                <h2>Search Results:</h2>
                <ol>
                    {searchResults.map((result) => {
                        <li key={result.id}>
                            {result.fileName} <button onClick={() => downloadFileHandler(result.id)}>Download PDF</button>
                        </li>
                    })}
                </ol>
                
        
            </div>
        </div>
    );
};



