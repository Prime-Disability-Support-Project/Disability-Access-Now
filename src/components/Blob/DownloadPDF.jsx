import React, { useState } from "react";
import { downloadFileHandler } from './downloadFile'; // util for downloading files
import Button from '@mui/material/Button';

export default function DownloadPDF() {
  const [fileName, setFileName] = useState("example.pdf");

  return (
    <Button onClick={() => downloadFileHandler(fileName)}>
      Download PDF
    </Button>
  );
}
