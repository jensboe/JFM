"""jfm URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from rest_framework.authtoken import views

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path("__reload__/", include("django_browser_reload.urls")),
    path('api/accounts/', include("django.contrib.auth.urls")),
    path('api/members/', include('members.urls')),
    path('', include('events.urls')),
    path('api/api-auth/', include('rest_framework.urls')),
    path('api/api-token-auth/', views.obtain_auth_token)
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
