from django.urls import path
from django.utils.translation import gettext_lazy as _
from . import views

app_name = 'members'
urlpatterns = [
    path('', views.ListView.as_view(), name='list'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/update/', views.UpdateView.as_view(), name='update'),
    path('create/', views.CreateView.as_view(), name='create'),
]
