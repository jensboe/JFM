from django.urls import path
from django.utils.translation import gettext_lazy as _
from . import views

app_name = 'start'
urlpatterns = [
    path('', views.StartView.as_view(), name='start'),

]
