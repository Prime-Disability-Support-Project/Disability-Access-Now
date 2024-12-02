import React, { useState } from "react";
import { downloadFileHandler } from './downloadFile'; // util for downloading files

export default function DownloadPDF() {
  const [fileName, setFileName] = useState("example.pdf");

  return (
    <button onClick={() => downloadFileHandler(fileName)}>
      Download PDF
    </button>
  );
}
