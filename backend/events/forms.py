from django.forms import BaseModelFormSet, modelformset_factory, RadioSelect, ModelForm, DateTimeInput, TextInput
from .models import Participant, Event


class BaseParticipantFormSet(BaseModelFormSet):
    def __init__(self, *args, **kwargs):
        event_id = kwargs.pop('event_id')
        super().__init__(*args, **kwargs)
        self.queryset = Participant.objects.filter(event_id=event_id)


ParticipantFormSet = modelformset_factory(
    Participant,
    fields=[
        'participation'],
    formset=BaseParticipantFormSet, extra=0, widgets={
        'participation': RadioSelect()
    })


class EventForm(ModelForm):

    class Meta:
        model = Event
        fields = ['title', 'start_date', 'end_date']
        widgets = {
            'title': TextInput(
                attrs={
                    'class': 'form-control'
                }
            ),
            'start_date': DateTimeInput(
                attrs={
                    'type': 'datetime-local',
                    'class': 'form-control'
                },
                format='%Y-%m-%d %H:%M'),
            'end_date': DateTimeInput(
                attrs={
                    'type': 'datetime-local',
                    'class': 'form-control'
                },
                format='%Y-%m-%d %H:%M'),
        }
