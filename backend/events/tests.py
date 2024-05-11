import json

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from events.models import Event, Participant
from members.models import Member


class EventModelTest(TestCase):
    def test_create_minimal_object(self):
        testdate = timezone.datetime(
            year=1234, month=3, day=8, hour=3)
        dut = Event.objects.create(start_date=testdate, end_date=testdate)
        self.assertEqual(dut.title, "")
        self.assertEqual(dut.note, "")
        self.assertEqual(dut.start_date, testdate)
        self.assertEqual(dut.end_date, testdate)
        self.assertEqual(dut.get_absolute_url(), "api/events/1")

    def test_add_participant(self):
        event_date = timezone.datetime(
            year=2, month=1, day=1)
        entry_date = timezone.datetime(
            year=1, month=1, day=1)
        exit_date = timezone.datetime(
            year=3, month=1, day=1)

        # Member must be created first to test the add function of the event
        Member.objects.create(entry_date=entry_date, exit_date=exit_date)
        Event.objects.create(start_date=event_date, end_date=event_date)

        self.assertEqual(len(Participant.objects.all()), 1)

    def test_add_participant_inactivmember(self):
        event_date = timezone.datetime(
            year=3, month=1, day=1)
        entry_date = timezone.datetime(
            year=1, month=1, day=1)
        exit_date = timezone.datetime(
            year=2, month=1, day=1)

        # Member must be created first to test the add function of the event
        Member.objects.create(entry_date=entry_date, exit_date=exit_date)

        Event.objects.create(start_date=event_date, end_date=event_date)

        self.assertEqual(len(Participant.objects.all()), 0)

    def test_add_participants(self):
        event_date = timezone.datetime(
            year=2, month=1, day=1)
        entry_date = timezone.datetime(
            year=1, month=1, day=1)
        exit_date = timezone.datetime(
            year=3, month=1, day=1)

        # Members must be created first to test the add function of the event
        Member.objects.create(
            firstname="Hans", entry_date=entry_date, exit_date=exit_date)
        Member.objects.create(firstname="Dieter",
                              entry_date=entry_date, exit_date=exit_date)
        Event.objects.create(start_date=event_date, end_date=event_date)

        self.assertEqual(len(Participant.objects.all()), 2)

    def test_add_participant_change_eventdate_inactive(self):
        event_date = timezone.datetime(
            year=2, month=1, day=1)
        entry_date = timezone.datetime(
            year=1, month=1, day=1)
        exit_date = timezone.datetime(
            year=3, month=1, day=1)
        new_event_date = timezone.datetime(
            year=4, month=1, day=1)

        # Member must be created first to test the add function of the event
        Member.objects.create(entry_date=entry_date, exit_date=exit_date)
        event = Event.objects.create(
            start_date=event_date, end_date=event_date)
        self.assertEqual(len(Participant.objects.all()), 1)
        event.start_date = new_event_date
        event.save()
        self.assertEqual(len(Participant.objects.all()), 0)

    def test_add_participant_change_eventdate_active(self):
        new_event_date = timezone.datetime(
            year=2, month=1, day=1)
        entry_date = timezone.datetime(
            year=1, month=1, day=1)
        exit_date = timezone.datetime(
            year=3, month=1, day=1)
        event_date = timezone.datetime(
            year=4, month=1, day=1)

        # Member must be created first to test the add function of the event
        Member.objects.create(entry_date=entry_date, exit_date=exit_date)
        event = Event.objects.create(
            start_date=event_date, end_date=event_date)
        self.assertEqual(len(Participant.objects.all()), 0)
        event.start_date = new_event_date
        event.save()
        self.assertEqual(len(Participant.objects.all()), 1)


class ParticipantModelTest(TestCase):
    def test_create_minimal_object(self):
        test_date = timezone.datetime(
            year=3001, month=2, day=3)
        event = Event.objects.create(
            start_date=test_date, end_date=test_date, title="Testevent")
        member = Member.objects.create(
            firstname='Dieter', lastname="Degenhart")
        dut = Participant.objects.create(event=event, member=member)
        self.assertEqual(dut.participation, Participant.Participation.ABSENT)
        self.assertEqual(
            str(dut), "03.02.01 00:00 | Testevent-Dieter Degenhart: ABS")

class EventUrlTest(TestCase):
    def test_events_ical(self):
        response = self.client.get('/feed/calender.ics')
        self.assertEqual(response.status_code, 200)

    def test_events_ical_legacy(self):
        response = self.client.get('/events/feed/calender.ics')
        self.assertEqual(response.status_code, 200)

    def test_events_api_root(self):
        user = User.objects.create_user('username', 'Pas$w0rd')
        url = '/api/events/'
        
        # logged out
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
        
        self.client.force_login(user)
        # logged in
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_events_api_unknown_event(self):
        user = User.objects.create_user('username', 'Pas$w0rd')
        url = '/api/events/1/'
        
        # logged out
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
        
        self.client.force_login(user)
        # logged in
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)


    def test_events_api_first_event(self):
        user = User.objects.create_user('username', 'Pas$w0rd')
        event_date = timezone.datetime(year=2, month=1, day=1)
        Event.objects.create(start_date=event_date, end_date=event_date, title="Testevent")
        url = '/api/events/1/'
        
        # logged out
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
        
        self.client.force_login(user)
        # logged in
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(json.loads(response.content), {
            'pk': 1,
            'title': 'Testevent',
            'start_date': '0002-01-01T00:00:00+01:00',
            'end_date': '0002-01-01T00:00:00+01:00',
            'participants' : []
        })

    def test_events_api_list_2_events(self):
        user = User.objects.create_user('username', 'Pas$w0rd')
        event_date = timezone.datetime(year=2, month=1, day=1)
        Event.objects.create(start_date=event_date, end_date=event_date, title="Testevent 1")
        url = '/api/events/'
        
        # logged out
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
        
        self.client.force_login(user)
        # logged in
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content)), 1)

        event_date = timezone.datetime(year=2, month=1, day=2)
        Event.objects.create(start_date=event_date, end_date=event_date, title="Testevent 2")

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(json.loads(response.content)), 2)