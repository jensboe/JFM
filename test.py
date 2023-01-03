import cv2
from pathlib import Path

# load image
image = cv2.imread('media/input.jpg')


# face detection
modelpath = Path(cv2.__file__).parent / 'data'
frontalface = modelpath / 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(str(frontalface))


gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(gray_image, 1.3, 5)

# face crop
for (x, y, w, h) in faces:
    face_cropped = image[y:y+h, x:x+w]

# show results
cv2.imshow("Face Cropped", face_cropped)
cv2.waitKey(0)
