from django.views import generic
from .models import Event


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
