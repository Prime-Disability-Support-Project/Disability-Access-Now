import { useState } from "react";
import React from "react";
import { showOpenFilePicker } from 'native-file-system-adapter';

// Uploads and Saves to the DB with one button!

export default function UploadPDF() {
  const [fileTitle, setFileTitle] = useState('');

  const uploadFileHandler = async (file) => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
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

  const openFileHandler = async () => {
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

      const file = await fileHandle.getFile();
      setFileTitle(file.name);
      await uploadFileHandler(file);
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
  };

  return (
    <div>
      {/* <p>PDF Title: {fileTitle}</p> */}
      <button onClick={openFileHandler}>Upload New PDF</button>
    </div>
  );
}