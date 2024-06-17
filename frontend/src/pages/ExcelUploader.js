import React, { useState } from 'react';
import axios from 'axios';
import './ExcelUploader.css'; 

const ExcelUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', file); // Change 'excelFile' to 'csvFile'

    try {
      await axios.post('http://localhost:3001/api/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="upload-container">
      <input type="file" className="file-input" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload}>Upload CSV File</button> {/* Changed text to 'Upload CSV File' */}
    </div>
  );
};

export default ExcelUploader;
