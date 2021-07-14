import React, { useState } from "react";
import FileUpload from "./file-upload.comp.jsx";

function UploadArea() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
  };

  return (
    <div id="upload">
      <form onSubmit={handleSubmit}>
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadArea;