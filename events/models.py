from django.db import models

from django.utils import timezone


class Event(models.Model):
    title = models.CharField(max_length=200)
    start_date = models.DateField(default=timezone.now)
    start_time = models.TimeField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)
    end_time = models.TimeField(default=timezone.now)

    def __str__(self) -> str:
        return self.title
