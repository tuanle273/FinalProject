import axios from "axios";

const uploadImage = async (imageFile) => {
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/duax5havz/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "ml_default";

  const formData = new FormData();
  formData.append("file", imageFile);
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
        console.log(`Upload progress: ${progress}%`);
      },
    });

    if (response.status >= 200 && response.status < 300) {
      dispatch({
        type: "UPLOAD SUCCESS",
        payload: response.data.secure_url,
      });
      return { success: true, message: "Image uploaded successfully" };
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    dispatch({ type: "UPLOAD FAIL" });
    return { success: false, message: error.message };
  }
};

export default uploadImage;
