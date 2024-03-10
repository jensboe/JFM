from django.db import models

from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from members.models import Member

class Event(models.Model):
    title = models.CharField(max_length=200, verbose_name=_('title'))
    start_date = models.DateTimeField(
        default=timezone.now,
        verbose_name=_('start time'))
    end_date = models.DateTimeField(
        default=timezone.now,
        verbose_name=_('end time'))
    note = models.TextField(verbose_name=_('note'), default='', blank=True)

    class Meta:
        ordering = ['start_date']
        verbose_name = _('event')
        verbose_name_plural = _('events')

    def __str__(self) -> str:
        return f'{self.start_date:%d.%m.%y %H:%M} | {self.title}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self._add_participants()

    def _add_participants(self):
        from members.models import Member
        for member in Member.objects.all():
            if member.is_active(self.start_date):
                Participant.objects.update_or_create(
                    member=member,
                    event=self
                )
            else:
                Participant.objects.filter(member=member, event=self).delete()

    def get_absolute_url(self):
        return reverse('events:detail', kwargs={'pk': self.pk})


class Participant(models.Model):
    event = models.ForeignKey(
        Event,
        related_name='participants',
        on_delete=models.CASCADE,
        verbose_name=_('event'))
    member = models.ForeignKey(
        Member,
        related_name='participations',
        on_delete=models.CASCADE,
        verbose_name=_('member'))

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
        verbose_name = _('participant')
        verbose_name_plural = _('participants')

    def __str__(self) -> str:
        return f'{self.event}-{self.member}: {self.participation}'
