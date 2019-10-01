# from django.db import models
from django.contrib.gis.db import models
from datetime import datetime as dt

class Comment(models.Model):
    owner = models.ForeignKey('auth.User', related_name='comments', 
            on_delete=models.CASCADE, default=1)
    geom = models.PointField(null=True)
    author = models.CharField(max_length=80) 
    comment_text = models.TextField()
    status = models.CharField(max_length=20) 
    time_stamp = models.DateTimeField()

    def save(self, *args, **kwargs):
        self.author = self.owner
        self.time_stamp = dt.now()
        super(Comment, self).save(*args, **kwargs)

    def __str__(self):
        return self.owner.username + '-' + self.comment_text

class Assumption(models.Model):
    geom = models.PointField(null=False)
    text = models.TextField()
    status = models.CharField(max_length=254, null=True) 

class Question(models.Model):
    geom = models.PolygonField(null=False)
    text = models.TextField()
    status = models.CharField(max_length=254, null=True) 
