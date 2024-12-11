// util for downloading pdf files

export const downloadFileHandler = async (fileName) => {
    try {
      const response = await fetch(`/api/files/download/${fileName}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        alert('Error Downloading File');
      }
    } catch (error) {
      console.error('Unexpected Error: ', error);
      alert('Error Downloading File');
    }
  };
  