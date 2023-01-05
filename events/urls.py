from django.urls import path

from . import views

app_name = 'events'
urlpatterns = [
    path('', views.ListView.as_view(), name='list'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    # path('<int:pk>/update', views.UpdateView.as_view(), name='update'),
    # path('create/', views.CreateView.as_view(), name='create'),
]