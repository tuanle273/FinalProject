import jsQR from "jsqr";
import React, { useState } from "react";
const About = () => {
  const [qrData, setQrData] = useState("");

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const imageData = event.target.result;
      const image = new Image();

      image.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setQrData(code.data);
        } else {
          alert("No QR code found");
        }
      };

      image.src = imageData;
    };

    reader.readAsDataURL(file);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div>{qrData}</div>
    </div>
  );
};

export default About;
