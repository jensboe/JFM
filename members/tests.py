from django.test import TestCase
from events.models import Event, Participant

from members.models import Member
from django.utils import timezone


class MemberModelTest(TestCase):
    def test_create_minimal_object(self):
        before = timezone.now()
        minimal = Member.objects.create()
        after = timezone.now()
        self.assertEqual(minimal.firstname, "")
        self.assertEqual(minimal.lastname, "")
        self.assertEqual(minimal.fullname, " ")
        self.assertEqual(str(minimal), " ")
        self.assertFalse(minimal.is_instructor)
        self.assertGreaterEqual(minimal.entry_date, before)
        self.assertLessEqual(minimal.entry_date, after)
        self.assertIsNone(minimal.exit_date)
        self.assertEqual(minimal.image, None)
        self.assertEqual(minimal.image_square, None)
        self.assertEqual(minimal.image_passport, None)
        self.assertTrue(minimal.is_active())

    def test_fullname(self):
        dut = Member.objects.create(firstname="Hans", lastname="Dampf")
        self.assertEqual(dut.fullname, "Hans Dampf")

    def test_str(self):
        dut = Member.objects.create(firstname="Hans", lastname="Dampf")
        self.assertEqual(str(dut), "Hans Dampf")

    def test_is_active_dates_unknown(self):
        dut = Member.objects.create()
        dut.entry_date = None
        dut.exit_date = None
        self.assertTrue(dut.is_active())

    def test_is_active_entry_date_known(self):
        dut = Member.objects.create()
        dut.entry_date = timezone.now() - timezone.timedelta(days=10)
        dut.exit_date = None
        self.assertTrue(dut.is_active())

    def test_is_active_exit_date_known(self):
        dut = Member.objects.create()
        dut.entry_date = None
        dut.exit_date = timezone.now() + timezone.timedelta(days=10)
        self.assertTrue(dut.is_active())

    def test_is_active_all_dates_known(self):
        dut = Member.objects.create()
        dut.entry_date = timezone.now() - timezone.timedelta(days=10)
        dut.exit_date = timezone.now() + timezone.timedelta(days=10)
        self.assertTrue(dut.is_active())

    def test_is_active_firstday(self):
        dut = Member.objects.create()
        dut.entry_date = timezone.now()
        dut.exit_date = None
        self.assertTrue(dut.is_active())

    def test_is_active_lastday(self):
        dut = Member.objects.create()
        dut.entry_date = None
        dut.exit_date = timezone.now()
        self.assertTrue(dut.is_active())

    def test_is_active_oneday(self):
        dut = Member.objects.create()
        dut.entry_date = timezone.now()
        dut.exit_date = timezone.now()
        self.assertTrue(dut.is_active())

    def test_is_active_gone(self):
        dut = Member.objects.create()
        dut.entry_date = None
        dut.exit_date = timezone.now() - timezone.timedelta(days=1)
        self.assertFalse(dut.is_active())

    def test_is_active_soon(self):
        dut = Member.objects.create()
        dut.entry_date = timezone.now() + timezone.timedelta(days=1)
        dut.exit_date = None
        self.assertFalse(dut.is_active())

    def test_is_active_otherdate(self):
        dut = Member.objects.create()
        dut.entry_date = timezone.now() + timezone.timedelta(days=10)
        dut.exit_date = timezone.now() + timezone.timedelta(days=10)
        self.assertTrue(dut.is_active(
            timezone.now() + timezone.timedelta(days=10)))

    def test_add_participant(self):
        event_date = timezone.datetime(
            year=2, month=1, day=1, tzinfo=timezone.utc)
        entry_date = timezone.datetime(
            year=1, month=1, day=1, tzinfo=timezone.utc)
        exit_date = timezone.datetime(
            year=3, month=1, day=1, tzinfo=timezone.utc)

        # Event must be created first to test the add function of the member
        Event.objects.create(start_date=event_date, end_date=event_date)
        Member.objects.create(entry_date=entry_date, exit_date=exit_date)

        self.assertEqual(len(Participant.objects.all()), 1)

    def test_add_participant_inactivmember(self):
        event_date = timezone.datetime(
            year=3, month=1, day=1, tzinfo=timezone.utc)
        entry_date = timezone.datetime(
            year=1, month=1, day=1, tzinfo=timezone.utc)
        exit_date = timezone.datetime(
            year=2, month=1, day=1, tzinfo=timezone.utc)

        # Event must be created first to test the add function of the member
        Event.objects.create(start_date=event_date, end_date=event_date)
        Member.objects.create(entry_date=entry_date, exit_date=exit_date)

        self.assertEqual(len(Participant.objects.all()), 0)

    def test_add_participants(self):
        event_date = timezone.datetime(
            year=2, month=1, day=1, tzinfo=timezone.utc)
        entry_date = timezone.datetime(
            year=1, month=1, day=1, tzinfo=timezone.utc)
        exit_date = timezone.datetime(
            year=3, month=1, day=1, tzinfo=timezone.utc)

        # Event must be created first to test the add function of the member
        Event.objects.create(start_date=event_date, end_date=event_date)
        Event.objects.create(start_date=event_date, end_date=event_date)
        Member.objects.create(
            firstname="Hans", entry_date=entry_date, exit_date=exit_date)

        self.assertEqual(len(Participant.objects.all()), 2)

    def test_add_participant_change_entry(self):
        event_date = timezone.datetime(
            year=2, month=1, day=1, tzinfo=timezone.utc)
        entry_date = timezone.datetime(
            year=1, month=1, day=1, tzinfo=timezone.utc)
        exit_date = timezone.datetime(
            year=3, month=1, day=1, tzinfo=timezone.utc)

        Event.objects.create(start_date=event_date, end_date=event_date)
        member = Member.objects.create(
            firstname="Hans", entry_date=entry_date, exit_date=exit_date)
        self.assertEqual(len(Participant.objects.all()), 1)
        member.entry_date = exit_date
        member.save()
        self.assertEqual(len(Participant.objects.all()), 0)
        member.entry_date = entry_date
        member.save()
        self.assertEqual(len(Participant.objects.all()), 1)

    def test_add_participant_change_exit(self):
        event_date = timezone.datetime(
            year=2, month=1, day=1, tzinfo=timezone.utc)
        entry_date = timezone.datetime(
            year=1, month=1, day=1, tzinfo=timezone.utc)
        exit_date = timezone.datetime(
            year=3, month=1, day=1, tzinfo=timezone.utc)

        Event.objects.create(start_date=event_date, end_date=event_date)
        member = Member.objects.create(
            firstname="Hans", entry_date=entry_date, exit_date=exit_date)
        self.assertEqual(len(Participant.objects.all()), 1)
        member.exit_date = entry_date
        member.save()
        self.assertEqual(len(Participant.objects.all()), 0)
        member.exit_date = exit_date
        member.save()
        self.assertEqual(len(Participant.objects.all()), 1)
