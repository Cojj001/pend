"use client";

import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ taskId }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10 MB size limit
      setError("File size exceeds 10 MB");
      return;
    }

    // You can add file type validation here if needed
    // Example: if (!file.type.startsWith('image/')) { setError('Only image files are allowed'); return; }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("taskId", taskId);
    formData.append("uploadedBy", "current-user-id"); // Replace with actual user ID

    try {
      await axios.post("/api/attachments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setError("");
      // Handle successful upload (e.g., show a message or update UI)
    } catch (err) {
      console.error("Failed to upload file", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FileUpload;
