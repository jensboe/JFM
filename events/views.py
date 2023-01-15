
from django.views import generic
from django.forms import modelformset_factory
from .models import Event
from .forms import ParticipantFormSet


class ListView(generic.ListView):
    model = Event
    template_name = 'common/list.html'
    context_object_name = 'elements'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Events'
        context['element_url'] = 'events:detail'
        return context


class DetailView(generic.DetailView):
    model = Event


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
