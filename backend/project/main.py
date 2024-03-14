from ultralytics import YOLO
import cv2
import numpy as np
from id_recognition import id_capture
from text_extraction import pancard, aadharcard
import os

def id_recog():
    return id_capture()

def ocr():
    try:
        x = pancard()
    except Exception as e:
        print(f"Error occurred during PAN card OCR: {e}")
        x = None

    try:
        y = aadharcard()
    except Exception as e:
        print(f"Error occurred during Aadhar card OCR: {e}")
        y = None

    if x is not None and y is not None:
        return x + " and " + y
    elif x is not None:
        return x
    elif y is not None:
        return y
    else:
        return "No OCR result available."

def main():
    print(ocr())

def clean_directories():
    for directory in ["aadhar_img", "pan"]:
        for file in os.listdir(directory):
            file_path = os.path.join(directory, file)
            try:
                if os.path.isfile(file_path):
                    os.unlink(file_path)
            except Exception as e:
                print(f"Error deleting file {file_path}: {e}")


main()
