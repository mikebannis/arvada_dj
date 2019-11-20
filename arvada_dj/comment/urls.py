from django.urls import path
from django.conf.urls import include
from rest_framework.urlpatterns import format_suffix_patterns
from comment import views

urlpatterns = [
    path('responses/', views.ResponseList.as_view()),
    path('responses/<int:pk>/', views.ResponseDetail.as_view()),
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view()),

    # Return all responses for comment #comment_id
    path('responses-by-object/<str:object_type>/<int:object_id>/',
         views.ResponsesByObject.as_view()),

    # Close comm item
    path('close-comm-item/<str:object_type>/<int:object_id>/',
         views.close_comm_item),
         #views.CloseCommItem.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
