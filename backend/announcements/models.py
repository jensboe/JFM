from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class Announcement(models.Model):

    title = models.CharField(_("title"), max_length=200)
    text = models.TextField(_("text"), default="")
    start_date = models.DateField(
        default=timezone.now,
        verbose_name=_('start time'))

    def in_2_weeks():
        return timezone.now() + timezone.timedelta(weeks=2)

    end_date = models.DateField(
        default=in_2_weeks,
        verbose_name=_('end time'))

    class Meta:
        verbose_name = _('announcement')
        verbose_name_plural = _('announcements')

    def __str__(self) -> str:
        return f'{self.start_date} {self.title} (End: {self.end_date} )'
