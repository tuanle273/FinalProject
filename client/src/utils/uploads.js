import axios from "axios";
import { apiUrl } from "../../src/contexts/constants";

const cloudinaryUpload = (fileToUpload) => {
  return axios
    .post(apiUrl + "/user/cloudinary-upload", fileToUpload)
    .then((res, req) => console.log(req.secure_url))
    .catch((err) => console.log(err));
};

export default cloudinaryUpload;
