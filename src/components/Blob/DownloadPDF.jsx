import { useState } from "react";
import React from "react";
import { showOpenFilePicker, showSaveFilePicker } from 'native-file-system-adapter';

export default function DownloadPDF(){
    const [fileName, setFileName] = useState(null);
    const downloadFileHandler = async (fileName) => {
        try {
            // fetch file from server
          const response = await fetch(`http://localhost:5001/api/files/download/${fileName}`);
          if (response.ok) {
            // converts response to a blob
            const blob = await response.blob();
    
            // create a URL for blob
            const url = window.URL.createObjectURL(blob);
            
            // creates a download link
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
    
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

    return(
        <button onClick={() => downloadFileHandler(fileName)}></button>
    )
};