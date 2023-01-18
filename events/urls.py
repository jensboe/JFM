from django.urls import path

from . import views
from .feeds import EventFeed

app_name = 'events'
urlpatterns = [
    path('', views.ListView.as_view(), name='list'),
    path(
        '<int:pk>/',
        views.ParticipantFormView.as_view(),
        name='participation'),
    path(
        '<int:pk>/detail',
        views.EventDetailView.as_view(),
        name='detail'),
    path(
        '<int:pk>/update',
        views.EventUpdateView.as_view(),
        name='update'),
    path('create/', views.EventCreateView.as_view(), name='create'),
    path('feed/', EventFeed())
]
