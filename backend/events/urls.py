from django.urls import path, include, re_path
from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns
from rest_framework import routers
from . import views
from .feeds import EventFeed


router = routers.DefaultRouter()
router.register(r'events', views.EventViewSet)
router.register(r'participants', views.ParticipantViewSet)

app_name = 'events'
urlpatterns = [
    path ('api/', include(router.urls)),
    path('feed/calender.ics', EventFeed()),
]
