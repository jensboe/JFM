from django.urls import path, include
from django.utils.translation import gettext_lazy as _
from . import views
from rest_framework import routers

app_name = 'members'
router = routers.DefaultRouter()
router.register(r'', views.MemberViewSet)

urlpatterns = [
    path ('', include(router.urls)),
]
