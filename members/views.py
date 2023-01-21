from django.shortcuts import render
from django.views import generic
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from .models import Member


@method_decorator(login_required, name='dispatch')
class ListView(generic.ListView):
    model = Member
    template_name = 'common/list.html'
    context_object_name = 'elements'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = _('members')
        context['element_url'] = 'members:detail'
        return context


@method_decorator(login_required, name='dispatch')
class DetailView(generic.DetailView):
    model = Member


@method_decorator(login_required, name='dispatch')
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


@method_decorator(login_required, name='dispatch')
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
