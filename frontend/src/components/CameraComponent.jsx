import { useEffect, useRef, useState } from "react";
import axios from "axios";
// Importing CSS
import "../components/css/CameraComponent.css";

const CameraComponent = () => {
  // For the video element
  const videoRef = useRef(null);
  // For the Screenshot element
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);

  const [imageData, setImageData] = useState('');

  const [step, setStep] = useState(0);
  const textContent = [
    "Please turn on your camera",
    "Hold tight while we are capturing your photo",
    "Please put your Aadhar Card infront of the camera and Press Capture",
    "Please put your PAN Card infront of the camera and Press Capture",
    "Please put your Driving Liscence infront of the camera and Press Capture",
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Update the state with the camera stream
      setStream(stream);
      console.log(step);
      setStep((step) => {
        return step + 1;
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Setting the current stream of the video object to the user's camera
      }
    } catch (e) {
      console.log("Error while loading the user's video ", e);
    }
  };

  const stopCamera = () => {
    // The stream for the user would be stopped
    if (stream) {
      // For each of the tracks of the user the stream would be stopped
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      // Setting the stream state variable to be null again as the camera is now stopped
      setStream(null);
    } else {
      console.log("Camera is not running");
    }
  };

  const capturePhotos = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageData = canvasRef.current.toDataURL("image/png");
      console.log("Captured Photo", imageData);
      setStep(step + 1);
      // setImageUrl(imageData);
      // Convert base64-encoded image data to a Blob
      const blob = dataURLtoBlob(imageData);

      // Create a FormData object and append the Blob with a desired filename
      const formData = new FormData();

      const photos = ["face", "Aadhar", "PAN", "Driving"];

      formData.append("file", blob, `${photos[step - 1]}.png`);
      formData.append("name", `${photos[step - 1]}`);
      console.log(formData);

      // Use Axios to send the FormData to your server-side endpoint for saving
      axios
        .post("http://localhost:3000/saveImage", formData)
        .then((response) => {
          console.log("Image saved successfully:" , response.data);
          setImageData(response.data);
        })
        .catch((error) => {
          console.error("Error saving image:", error);
        });
    }
  };
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  };

  // Camera Component XML
  return (
    <div className="cameraComponent">
      <div id="videoelement">
        {/* For the video component to be rendered and played automatically when the stream state variable has a value or it is defined */}
        <video ref={videoRef} autoPlay></video>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div style={{ width: "100%", textAlign: "center" }}>
        {textContent[step]}
      </div>
      <div id="buttons">
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={capturePhotos}>Capture</button>
        <button onClick={stopCamera}>Stop Camera</button>
      </div>
      
      {/* Display captured photo */}
      {imageData && (
        <img src={imageData} alt="Base64 image" />)}
    </div>
  );
};

export default CameraComponent;
