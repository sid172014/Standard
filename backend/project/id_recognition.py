import cv2
from ultralytics import YOLO
import os
def id_capture(image_path):
    model = YOLO(r"./weights/id_recog.pt")

    frame = cv2.imread(image_path)

    results = model.track(frame, conf=0.90, persist=True)

    coord_list = results[0].boxes.data.tolist()
    try:
        x1 = int(coord_list[0][0])
        y1 = int(coord_list[0][1])
        x2 = int(coord_list[0][2])
        y2 = int(coord_list[0][3])
        id = coord_list[0][4]
        classes = coord_list[0][6]
        confid = coord_list[0][5]
        cord = (x1, y1, x2, y2)
        roi = frame[y1:y2, x1:x2]

        # Save image based on class (aadhar or pan)
        if classes == 0.0:
            output_directory = "aadhar_img"
        elif classes == 1.0:
            output_directory = "pan"
        else:
            print(f"Unknown class detected: {classes}. Image not saved.")
            return  # Stop function if class is unexpected

        output_path = os.path.join(output_directory, os.path.basename(image_path))
        os.makedirs(output_directory, exist_ok=True)
        cv2.imwrite(output_path, roi)

    except IndexError:  # Handle cases where no face/ID is detected
        pass

    annotated_frame = results[0].plot()
    # cv2.imshow("YOLOv8 Tracking", annotated_frame)
    # cv2.waitKey(0)  # Wait indefinitely until a key is pressed

    cv2.destroyAllWindows()

    print("ID capture complete.")
    return "id_uploaded"

# Provide the path to the image you want to process
image_path = "image1.jpeg"

# Call the function to capture ID
id_capture(image_path)
