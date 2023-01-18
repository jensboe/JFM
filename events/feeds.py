from django_ical.views import ICalFeed
from .models import Event
from icalendar import Alarm
from datetime import timedelta


class EventFeed(ICalFeed):
    """
    A simple event calender
    """
    product_id = 'jfm'
    timezone = 'UTC'
    file_name = "event.ics"

    def items(self):
        return Event.objects.all().order_by('-start_date')

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.title

    def item_start_datetime(self, item):
        return item.start_date

    def item_valarm(self, item):
        valarm = Alarm()
        valarm.add('action', 'display')
        valarm.add('description', f'JF: {item.title}')
        valarm.add('trigger', timedelta(days=-1))
        return [valarm]
