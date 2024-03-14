import cv2
from ultralytics import YOLO
import os
from PIL import Image
import io
import base64

# Load the YOLOv8 model
model = YOLO(r"./yolov8n-face.pt")

# Open the video file
cap = cv2.VideoCapture(0)
f = 0

# Get the script directory
os.path.join(os.path.dirname(__file__))
script_dir = os.path.dirname(os.path.realpath(__file__))

# Loop through the video frames
while cap.isOpened():
    success, frame = cap.read()
    f =1  # Increment frame count for filename

    if success:
        # Run YOLOv8 tracking on the frame, persisting tracks between frames
        results = model.track(frame, conf=0.70, persist=True)

        coord_list = results[0].boxes.data.tolist()

        try:
            x1 = int(coord_list[0][0])
            y1 = int(coord_list[0][1])
            x2 = int(coord_list[0][2])
            y2 = int(coord_list[0][3])
            id = coord_list[0][4]
            confid = coord_list[0][5]
            print("---------", y1, y2, x1, x2, "---------")
            cord = (x1, y1, x2, y2)
            roi = frame[y1:y2, x1:x2]

            # Create image filename with frame number
            filename = f"img{f}.jpg"

            # Save the ROI image as JPG (for potential later use)
            cv2.imwrite(os.path.join(script_dir, filename), roi)

            # Encode the ROI image as Base64
            buffered = io.BytesIO()
            pil_image = Image.fromarray(roi)  # Convert OpenCV image to PIL image
            pil_image.save(buffered, format="JPEG")  # Save PIL image to memory buffer
            encoded_string = base64.b64encode(buffered.getvalue()).decode("utf-8")

            # Save the encoded string to a TXT file
            with open(os.path.join(script_dir, f"encoded_{f}.txt"), "w") as text_file:
                text_file.write(encoded_string)

        except IndexError:  # Handle cases where no face is detected
            pass

        annotated_frame = results[0].plot()
        cv2.imshow("YOLOv8 Tracking", annotated_frame)

        # Check for termination key press (Shift+W)
        key = cv2.waitKey(1) & 0xFF
        if key == ord("w") and cv2.waitKey(0) == ord("shift"):
            break

    else:
        # Break the loop if video capture fails
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
