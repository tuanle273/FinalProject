import axios from "axios";
import React, { useState } from "react";

const About = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/duax5havz/image/upload";
    const CLOUDINARY_UPLOAD_PRESET = "ml_default";

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadStatus(`Upload progress: ${progress}%`);
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setUploadStatus("Image uploaded successfully");
        console.log(response.data.secure_url); // use this URL to save to database or display the image
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      setUploadStatus(error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default About;
