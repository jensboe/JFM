import cv2
from pathlib import Path
from django.db import models
from jfm.settings import MEDIA_ROOT
from django.core.files.base import ContentFile
import logging
from PIL import Image, ImageOps
import numpy


class Member(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    image = models.ImageField(upload_to='members/org', null=True, blank=True)
    image_square = models.ImageField(
        upload_to='members/square', null=True, blank=True)
    image_passport = models.ImageField(
        upload_to='members/passport', null=True, blank=True)

    @property
    def fullname(self) -> str:
        return f'{self.firstname} {self.lastname}'

    def __str__(self) -> str:
        return self.fullname

    def save(self, *args, **kwargs) -> None:
        self.image_square = self._create_headshoot_square(self.image)
        self.image_passport = self._create_headshoot(self.image, 9, 7)
        return super().save(*args, **kwargs)

    def _convertImageFile2opencv(self, field) -> numpy.array:
        before = Image.open(field).convert('RGB')
        after = ImageOps.exif_transpose(before)
        img = numpy.array(after)
        return img[:, :, ::-1].copy()  # convert RGB to BGR

    def _create_headshoot_square(self, src_img_field) -> ContentFile:
        return self._create_headshoot(src_img_field)

    def _create_headshoot(
            self,
            src_img_field,
            y_ratio: int = 1,
            x_ratio: int = 1) -> ContentFile:
        img = self._convertImageFile2opencv(src_img_field)

        modelpath = Path(cv2.__file__).parent / 'data'

        frontalface = modelpath / 'haarcascade_frontalface_default.xml'
        face_cascade = cv2.CascadeClassifier(str(frontalface))
        gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray_image)

        (x, y, w, h) = faces[0]
        # calculate the face center
        xc = x + (w / 2)
        yc = y + (h / 2)
        # Debug circle in center
        # cv2.circle(img, (int(xc), int(yc)), 200, (0, 0, 255), 100)

        x_max_size = min(xc, (img.shape[1] - xc))
        y_max_size = min(yc, (img.shape[0] - yc))

        # Get the maximum size while respecting the ratio
        if x_max_size * x_ratio > y_max_size * y_ratio:
            x_size = y_max_size * x_ratio / y_ratio
            y_size = y_max_size
        else:
            x_size = x_max_size
            y_size = x_max_size * y_ratio / x_ratio

        x_size = int(x_size)
        y_size = int(y_size)

        img = img[yc - y_size:yc + y_size, xc - x_size:xc + x_size]
        # Debug crop rectangle
        # cv2.rectangle(img,
        #               (xc - x_size, yc - y_size),
        #               (xc + x_size, yc + y_size),
        #               (255, 0, 0),
        #               30
        #               )
        ret, buf = cv2.imencode('.jpg', img)
        return ContentFile(buf.tobytes(), name=f'{self.fullname}.jpg')
