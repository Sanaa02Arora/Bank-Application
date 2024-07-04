import React, { useState } from 'react';
import styled from 'styled-components';

const maxSize = 4.5 * 1024 * 1024; // 4.5MB
const validFormats = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust as needed for your layout */
  margin-left:65vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center align the content inside Container */
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const UploadBox = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  position: relative;
`;

const FilePreview = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const RemoveFile = styled.span`
  cursor: pointer;
  color: red;
  font-size: 16px;
  margin-left: 10px;
`;

const Error = styled.p`
  color: red;
  margin-top: 10px;
`;

const DocumentUpload = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [filePreviewVisible, setFilePreviewVisible] = useState(false);
  const [filePreviewContent, setFilePreviewContent] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setFilePreviewContent(generateFilePreview(file));
        setFileName(file.name);
        setFilePreviewVisible(true);
        setErrorMessage('');
      } else {
        resetFilePreview();
      }
    }
  };

  const validateFile = (file) => {
    if (file.size > maxSize) {
      setErrorMessage('File size should not exceed 4.5MB.');
      return false;
    }
    if (!validFormats.includes(file.type)) {
      setErrorMessage('Invalid file format. Please upload a PDF, JPG, JPEG, or PNG file.');
      return false;
    }
    return true;
  };

  const generateFilePreview = (file) => {
    if (file.type.startsWith('image/')) {
      return <img src={URL.createObjectURL(file)} alt="File Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />;
    } else {
      return <span>📄</span>;
    }
  };

  const resetFilePreview = () => {
    setFilePreviewContent('');
    setFileName('');
    setFilePreviewVisible(false);
  };

  const handleRemoveFile = () => {
    resetFilePreview();
    document.getElementById('fileInput').value = ''; // Clear the file input
  };

  const handleSubmit = () => {
    if (!filePreviewVisible) {
      alert('Please select a document for upload.');
      return;
    }
    // Process form submission logic here
    alert('Documents submitted successfully!');
  };

  return (
    <CenteredContainer>
      <Container>
        <Header>
          <h2 style={{ fontSize: '24px' }}>Document Upload</h2>
          <p>We just need a little more information from you.</p>
        </Header>

        <Section>
          <h3>Identity Verification</h3>
          <p>Please upload one document from each section below for verification.</p>
          <div>
            <label htmlFor="identityDocumentType">Select Document Type:</label>
            <select id="identityDocumentType">
              <option value="aadhaar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
            </select>
          </div>
          <UploadBox
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              type="file"
              id="fileInput"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={(e) => handleFiles(e.target.files)}
              style={{ display: 'none' }}
            />
            {!filePreviewVisible && <p>Drag and drop a file here or click to select a file</p>}
            {filePreviewVisible && (
              <FilePreview>
                <FileInfo>
                  {filePreviewContent}
                  <span>{fileName}</span>
                </FileInfo>
                <RemoveFile onClick={handleRemoveFile}>✖ Delete</RemoveFile>
              </FilePreview>
            )}
          </UploadBox>
          {errorMessage && <Error>{errorMessage}</Error>}
        </Section>

        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </Container>
    </CenteredContainer>
  );
};

export default DocumentUpload;
