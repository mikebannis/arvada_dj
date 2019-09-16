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

# Serializers define the API representation.
#class UserSerializer(serializers.HyperlinkedModelSerializer):
#    class Meta:
#        model = User
#        fields = ['url', 'username', 'email', 'is_staff']
#
## ViewSets define the view behavior.
#class UserViewSet(viewsets.ModelViewSet):
#    queryset = User.objects.all()
#    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
#router = routers.DefaultRouter()
#router.register(r'users', UserViewSet)
#router.register(r'group', GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
#urlpatterns = [
#    url(r'^', include(router.urls)),
#    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
#]

urlpatterns = [
    path('main/', include('main.urls')),
    path('map/', include('map.urls')),
    path('', main.views.index),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    #path('', include(router.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include('comment.urls')),
]

urlpatterns += staticfiles_urlpatterns()
