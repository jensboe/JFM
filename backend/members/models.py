import datetime
from pathlib import Path
from collections import namedtuple
import cv2
import numpy
from PIL import Image, ImageOps
from django.db import models
from django.core.files.base import ContentFile
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class Member(models.Model):
    firstname = models.CharField(max_length=100, verbose_name=_('first name'))
    lastname = models.CharField(max_length=100, verbose_name=_('last name'))
    is_instructor = models.BooleanField(
        verbose_name=_('instructor'), default=False)

    entry_date = models.DateField(verbose_name=_(
        'entry date'), blank=True, default=timezone.now)
    exit_date = models.DateField(verbose_name=_(
        'exit date'), blank=True, null=True)
    image = models.ImageField(
        upload_to='members/org',
        null=True,
        blank=True,
        verbose_name=_('image'))
    image_square = models.ImageField(
        upload_to='members/square',
        null=True,
        blank=True,
        verbose_name=_('square image'))
    image_passport = models.ImageField(
        upload_to='members/passport',
        null=True,
        blank=True,
        verbose_name=_('passwort image'))
    Point = namedtuple("Point", "x y")

    class Meta:
        ordering = ['is_instructor', 'lastname']
        verbose_name = _('member')
        verbose_name_plural = _('members')

    @property
    def fullname(self) -> str:
        return f'{self.firstname} {self.lastname}'

    def __str__(self) -> str:
        return self.fullname

    def save(self, *args, **kwargs) -> None:
        if self.image:
            self.image_square = self._create_headshoot_square(self.image)
            self.image_passport = self._create_headshoot(self.image, 7, 9)
        super().save(*args, **kwargs)
        self._add_participants()

    def _add_participants(self):
        from events.models import Participant, Event
        for event in Event.objects.all():
            if self.is_active(event.start_date):
                Participant.objects.update_or_create(
                    member=self,
                    event=event
                )
            else:
                Participant.objects.filter(member=self, event=event).delete()

    def is_active(self, date: timezone.datetime = None) -> bool:
        if not date:
            date = timezone.now()
        if date and type(date) is not datetime.date:
            date = date.date()
        if self.entry_date and type(self.entry_date) is not datetime.date:
            entry_date = self.entry_date.date()
        else:
            entry_date = self.entry_date

        if self.exit_date and type(self.exit_date) is not datetime.date:
            exit_date = self.exit_date.date()
        else:
            exit_date = self.exit_date

        if entry_date:
            if date < entry_date:
                return False
        if exit_date:
            if date > exit_date:
                return False
        return True

    def _create_headshoot_square(
            self, src_img_field: models.ImageField) -> ContentFile:
        return self._create_headshoot(src_img_field)

    def _create_headshoot(
            self,
            src_img_field: models.ImageField,
            x_ratio: int = 1,
            y_ratio: int = 1) -> ContentFile:
        img = self._convertImageFile2opencv(src_img_field)
        faces = self._detectFaces(img)
        (x, y, w, h) = faces[0]

        # calculate the face center
        face_center = self.Point(x + (w / 2), y + (h / 2))
        # Debug circle in center
        # cv2.circle(img, (int(xc), int(yc)), 200, (0, 0, 255), 100)

        # Calculate distance between face_center and image boarder)
        # Thats the maximum size an Image can have.
        # The real max. width and hight is 2*x_max_size and 2*y_max_size
        # We always use the center as reference  so lets save the multiply by 2
        # and divide by 2
        x_max_size = min(face_center.x, (img.shape[1] - face_center.x))
        y_max_size = min(face_center.y, (img.shape[0] - face_center.y))

        # With the ratio in mind, calculate which size is the size is the
        # limmiting factor for cropping
        if x_max_size * x_ratio > y_max_size * y_ratio:
            x_size = y_max_size * x_ratio / y_ratio
            y_size = y_max_size
        else:
            x_size = x_max_size
            y_size = x_max_size * y_ratio / x_ratio

        # Only integer can be used to slice an array
        x_size = int(x_size)
        y_size = int(y_size)

        img = img[int(face_center.y - y_size):int(face_center.y + y_size),
                  int(face_center.x - x_size):int(face_center.x + x_size)]

        # Debug crop draw rectangle
        # cv2.rectangle(img,
        #               (face_center.x - x_size, face_center.y - y_size),
        #               (face_center.x + x_size, face_center.y + y_size),
        #               (255, 0, 0),
        #               30
        #               )

        # Save as jpg
        ret, buf = cv2.imencode('.jpg', img)
        return ContentFile(buf.tobytes(), name=f'{self.fullname}.jpg')

    def _convertImageFile2opencv(self, field) -> numpy.array:
        before = Image.open(field).convert('RGB')
        after = ImageOps.exif_transpose(before)
        img = numpy.array(after)
        return img[:, :, ::-1].copy()  # convert RGB to BGR

    def _detectFaces(self, img: numpy.array) -> numpy.array:
        gray_image: numpy.array = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        modelpath: Path = Path(cv2.__file__).parent / 'data'
        frontalface: Path = modelpath / 'haarcascade_frontalface_default.xml'
        face_cascade: cv2.CascadeClassifier = cv2.CascadeClassifier(
            str(frontalface))

        faces: numpy.array = face_cascade.detectMultiScale(gray_image)
        return faces
