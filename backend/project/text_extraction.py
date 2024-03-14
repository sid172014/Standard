from ultralytics import YOLO
import matplotlib.pyplot as plt
import numpy as np
import os
from PIL import Image
import easyocr
import os
def pancard():
    pan_dir=r"./pan/"
    img_name=os.listdir(pan_dir)
    path=pan_dir + img_name[0]
    print("------",path)
    model = YOLO(r"./weights/pan.pt")
    results=model.predict(path,save=True)
    coord_list = results[0].boxes.data.tolist()
    org_image=Image.open(path)
    reader = easyocr.Reader(['en'])
    for i in range(len(coord_list)):
        x1=coord_list[i][0]
        y1=coord_list[i][1]
        x2=coord_list[i][2]
        y2=coord_list[i][3]
        acc=coord_list[i][4]
        classes=coord_list[i][5]
        if classes == 3.0:
            cord=(x1,y1,x2,y2)
            roi=org_image.crop(cord)
            roi=np.array(roi)
            text_result = reader.readtext(roi)
            print(text_result[0][1])
        if classes == 0.0:
            cord=(x1,y1,x2,y2)
            roi=org_image.crop(cord)
            roi=np.array(roi)
            text_result = reader.readtext(roi)
            print(text_result[0][1])
        if classes == 4.0:
            cord=(x1,y1,x2,y2)
            roi=org_image.crop(cord)
            roi=np.array(roi)
            text_result = reader.readtext(roi)
            print(text_result[0][1])
    return "pancard uploaded"
def aadharcard():
    aadhar_dir=r"./aadhar_img/"
    img_name=os.listdir(aadhar_dir)
    path=aadhar_dir + img_name[0]
    model = YOLO(r"./weights/aadhar.pt")
    results=model.predict(path,save=True)
    coord_list = results[0].boxes.data.tolist()
    org_image=Image.open(path)
    reader = easyocr.Reader(['en'])
    for i in range(len(coord_list)):
        x1=coord_list[i][0]
        y1=coord_list[i][1]
        x2=coord_list[i][2]
        y2=coord_list[i][3]
        acc=coord_list[i][4]
        classes=coord_list[i][5]
        if classes == 4.0:
            cord=(x1,y1,x2,y2)
            roi=org_image.crop(cord)
            roi=np.array(roi)
            text_result = reader.readtext(roi)
            try:
                print(text_result[1][1])
            except:
                pass
            try:
                print(text_result[4][1])
            except:
                print(text_result[0][1])
            try:
                print(text_result[3][1])
            except:
                pass
        if classes == 0.0:
            cord=(x1,y1,x2,y2)
            roi=org_image.crop(cord)
            roi=np.array(roi)
            text_result = reader.readtext(roi)
            print(text_result[0][1])
    return "aadhar card uploaded"