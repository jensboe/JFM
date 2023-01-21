
from django.forms.models import modelform_factory
from django.urls import reverse
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import Event
from .forms import ParticipantFormSet, EventForm
from django.utils.translation import gettext_lazy as _


class ListView(generic.ListView):
    model = Event
    template_name = 'common/list.html'
    context_object_name = 'elements'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = _('events')
        context['element_url'] = 'events:participation'
        return context


class EventUpdateView(generic.UpdateView):
    model = Event
    template_name = 'events/event_form.html'
    form_class = EventForm


class EventDetailView(generic.DetailView):
    model = Event


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
