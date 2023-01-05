from django.shortcuts import render
from django.views import generic
from django.urls import reverse_lazy

from .models import Member


class ListView(generic.ListView):
    model = Member
    template_name = 'common/list.html'
    context_object_name = 'elements'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Members'
        context['element_url'] = 'members:detail'
        return context


class DetailView(generic.DetailView):
    model = Member


class UpdateView(generic.UpdateView):
    model = Member
    fields = [
        'firstname',
        'lastname',
        'image',
        'image_square',
        'image_passport'
    ]

    def get_success_url(self):
        return reverse_lazy('members:update', kwargs={'pk': self.object.id})


class CreateView(generic.CreateView):
    model = Member
    success_url = reverse_lazy('members:list')
    fields = [
        'firstname',
        'lastname',
        'image',
        'image_square',
        'image_passport'
    ]
