from django.urls import path
from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns

from . import views
from .feeds import EventFeed

app_name = 'events'
urlpatterns = [
    path('', views.ListView.as_view(), name='list'),
    path(
        '<int:pk>/',
        views.ParticipantFormView.as_view(),
        name='participation'),
    path(_('<int:pk>/detail/'),
         views.EventDetailView.as_view(),
         name='detail'),
    path(_('<int:pk>/update/'),
         views.EventUpdateView.as_view(),
         name='update'),
    path(_('create/'), views.EventCreateView.as_view(), name='create'),
    path(_('feed/calender.ics'), EventFeed())
]
