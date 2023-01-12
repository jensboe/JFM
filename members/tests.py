from django.test import TestCase


class SampleTests(TestCase):
    def test_construct_empty(self):
        self.assertEqual('test', 'test')
