from django.forms import BaseModelFormSet, modelformset_factory
from .models import Participant


class BaseParticipantFormSet(BaseModelFormSet):
    def __init__(self, *args, **kwargs):
        event_id = kwargs.pop('event_id')
        super().__init__(*args, **kwargs)
        self.queryset = Participant.objects.filter(event_id=event_id)


ParticipantFormSet = modelformset_factory(
    Participant,
    fields=[
        'participation'],
    formset=BaseParticipantFormSet, extra=0)
