from django.views import generic
from .models import Event


class ListView(generic.ListView):
    model = Event
    context_object_name = 'events'
