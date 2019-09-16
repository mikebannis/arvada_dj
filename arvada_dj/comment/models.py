# from django.db import models
from django.contrib.gis.db import models

class Comment(models.Model):
    owner = models.ForeignKey('auth.User', related_name='comments', 
            on_delete=models.CASCADE, default=1)
    geom = models.PointField()
    author = models.CharField(max_length=80) 
    comment_text = models.TextField()
    status = models.CharField(max_length=20) 
    #time_stamp = models.DateTimeField()
