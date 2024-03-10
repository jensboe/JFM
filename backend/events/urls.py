from django.urls import path, include
from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns
from rest_framework import routers
from . import views
from .feeds import EventFeed


eventrouter = routers.DefaultRouter()
eventrouter.register(r'', views.EventViewSet)
partyrouter = routers.DefaultRouter()
partyrouter.register(r'', views.ParticipantViewSet)

app_name = 'events'
urlpatterns = [
    path ('events/', include(eventrouter.urls)),
    path ('participations/', include(partyrouter.urls)),
    path('feed/calender.ics', EventFeed()),
]
