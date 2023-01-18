from django.db import models

from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.urls import reverse


class Event(models.Model):
    title = models.CharField(max_length=200)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        from members.models import Member
        super().save(*args, **kwargs)
        for member in Member.objects.all():
            Participant.objects.update_or_create(
                member=member,
                event=self
            )

    def get_absolute_url(self):
        return reverse('events:detail', kwargs={'pk': self.pk})


class Participant (models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    member = models.ForeignKey('members.Member', on_delete=models.CASCADE)

    class Participation(models.TextChoices):
        PRESENT = 'PRE', _('present')
        EXCUSED = 'EXC', _('excused')
        ABSENT = 'ABS', _('absent')

    participation = models.CharField(
        max_length=3,
        choices=Participation.choices,
        default=Participation.ABSENT,
    )

    class Meta:
        ordering = ['member']

    def __str__(self) -> str:
        return f'{self.event}-{self.member}: {self.participation}'
