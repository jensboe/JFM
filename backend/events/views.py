
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from members.views import MemberEventSerializer

from .models import Event, Participant
from .forms import ParticipantFormSet, EventForm
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers, viewsets

@method_decorator(login_required, name='dispatch')
class EventUpdateView(generic.UpdateView):
    model = Event
    template_name = 'events/event_form.html'
    form_class = EventForm


class EventDetailView(generic.DetailView):
    model = Event


@method_decorator(login_required, name='dispatch')
class EventCreateView(generic.CreateView):
    model = Event
    template_name = 'events/event_form.html'
    form_class = EventForm


@method_decorator(login_required, name='dispatch')
class ParticipantFormView(generic.FormView):
    template_name = 'participations/participation_form.html'
    form_class = ParticipantFormSet
    success_url = '/'

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({
            'event_id': self.kwargs['pk']
        })
        return kwargs

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['event'] = Event.objects.get(id=self.kwargs['pk'])
        return context
    
class ParticipantSerializer(serializers.ModelSerializer):
    member = MemberEventSerializer(many=False, read_only=True, )
    class Meta:
        model = Participant
        fields = ['pk', 'member', 'event', 'participation']
    
class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

class EventSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True, read_only=True)
    class Meta:
        model = Event
        fields = ['pk', 'title', 'start_date', 'end_date', 'note', 'participants']
    
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
