from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from comment import views

urlpatterns = [
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view()),
    #path('comments/', views.comment_list),
    #path('comments/<int:pk>/', views.comment_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
