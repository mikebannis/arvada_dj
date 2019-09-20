"""arvada_dj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib.auth.models import User
#from django.conf.urls import url, include
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
#from comment.views import UserViewSet, GroupViewSet
import main
import map
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns = [

    path('main/', include('main.urls')),
    path('map/', include('map.urls')),
    path('', main.views.index),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('arvada/', main.views.arvada),
    #path('', include(router.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include('comment.urls')),
]

urlpatterns += staticfiles_urlpatterns()
