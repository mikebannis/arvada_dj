from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='map_index'),
    path('super_map', views.super_map, name='super_map'),
]
