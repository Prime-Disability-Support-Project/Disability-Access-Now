import { useState } from "react";
import React from "react";
import { showOpenFilePicker, showSaveFilePicker } from 'native-file-system-adapter';

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

export default function UploadPDF(){
    const [fileHandle, setFileHandle] = useState(null);
    const [fileTitle, setFileTitle] = useState('');
    const [file, setFile] = useState(null);

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



    // <button onClick={() => downloadFileHandler(file.name)}>Download PDF</button>

    return (
        <div>
          <h1>PDF Title: {fileTitle} </h1>
          <button onClick={openFileHandler}>Open a PDF File</button>
          <button onClick={uploadFileHandler}>Upload New PDF File</button>
        </div>
      );
};