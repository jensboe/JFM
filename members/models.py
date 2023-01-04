import cv2
from pathlib import Path
from django.db import models
from jfm.settings import MEDIA_ROOT
from django.core.files.base import ContentFile
import logging


class Member(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    image = models.ImageField(upload_to='members/org', null=True, blank=True)
    image_square = models.ImageField(
        upload_to='members/square', null=True, blank=True)

    @property
    def fullname(self) -> str:
        return f'{self.firstname} {self.lastname}'

    def __str__(self) -> str:
        return self.fullname

    def save(self, *args, **kwargs) -> None:
        self._create_square()
        return super().save(*args, **kwargs)

    def _create_square(self) -> None:
        store = MEDIA_ROOT / self.image.name
        img = cv2.imread(str(store))

        modelpath = Path(cv2.__file__).parent / 'data'

        frontalface = modelpath / 'haarcascade_frontalface_default.xml'
        face_cascade = cv2.CascadeClassifier(str(frontalface))
        gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray_image)
        if len(faces) > 0:
            (x, y, w, h) = faces[0]
            # calculate the face center
            yc = int(y + (h / 2))
            xc = int(x + (w / 2))

            size = min(yc, xc, (img.shape[1] - yc), (img.shape[0] - xc))

            face_cropped = img[yc - size:yc + size, xc - size:xc + size]

            ret, buf = cv2.imencode('.jpg', face_cropped)
            self.image_square = ContentFile(
                buf.tobytes(), name=f'{self.fullname}.jpg')
        else:
            logging.error(f'Detect {len(faces)} faces instead of one')
