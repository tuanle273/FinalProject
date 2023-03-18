import cloudinaryUpload from "../../../utils/uploads";

const About = () => {
  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append("file", e.target.files[0], "file");
      const response = await cloudinaryUpload(uploadData);
      const secureUrl = response.secure_url;
      console.log("Uploaded file:", secureUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <div style={{ margin: 10 }}>
        <label style={{ margin: 10 }}>Cloudinary:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
      </div>
    </div>
  );
};

export default About;
