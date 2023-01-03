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
    success_url = reverse_lazy('members:list')
    fields = ['firstname', 'lastname', 'image']


class CreateView(generic.CreateView):
    model = Member
    success_url = reverse_lazy('members:list')
    fields = ['firstname', 'lastname', 'image']
