from django.shortcuts import render
from django.views import generic
from django.urls import reverse_lazy

from .models import Member


class ListView(generic.ListView):
    model = Member
    context_object_name = 'members'


class DetailView(generic.DetailView):
    model = Member


class UpdateView(generic.UpdateView):
    model = Member
    fields = ['firstname', 'lastname', 'image', 'image_square']

    def get_success_url(self):
        return reverse_lazy('members:update', kwargs={'pk': self.object.id})


class CreateView(generic.CreateView):
    model = Member
    success_url = reverse_lazy('members:list')
    fields = ['firstname', 'lastname', 'image', 'image_square']
