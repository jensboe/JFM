from django.db import models

from django.utils import timezone

from members.models import Member


class Event(models.Model):
    title = models.CharField(max_length=200)
    start_date = models.DateField(default=timezone.now)
    start_time = models.TimeField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)
    end_time = models.TimeField(default=timezone.now)

    def __str__(self) -> str:
        return self.title


class Participant (models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)

    class Meta:
        ordering = ['member']

    def __str__(self) -> str:
        return f'{self.member} - {self.event}'
