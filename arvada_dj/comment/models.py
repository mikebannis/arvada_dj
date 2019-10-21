from django.contrib.gis.db import models
from datetime import datetime as dt
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation


class Response(models.Model):
    owner = models.ForeignKey('auth.User', related_name='response',
                              on_delete=models.CASCADE, default=2)
    author_name = models.CharField(max_length=80)
    text = models.TextField()
    time_stamp = models.DateTimeField()

    # Linking to Comment, Question, or Assumption
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    target_object = GenericForeignKey('content_type', 'object_id')

    def save(self, *args, **kwargs):
        self.author_name = self.owner.first_name + ' ' + self.owner.last_name
        self.time_stamp = dt.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return '(' + str(self.content_type) + ') ' + self.author_name + '-' + \
               self.text


class Comment(models.Model):
    owner = models.ForeignKey('auth.User', related_name='comments',
                              on_delete=models.CASCADE, default=1)
    geom = models.PointField(null=True)
    author = models.CharField(max_length=80)
    comment_text = models.TextField()
    status = models.CharField(max_length=20)
    time_stamp = models.DateTimeField()
    # Is this a comment on hydrology, alts, CD, etc?
    generation = models.CharField(max_length=40, null=True, blank=True)
    responses = GenericRelation(Response)
    num_responses = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.author = self.owner.first_name + ' ' + self.owner.last_name
        self.time_stamp = dt.now()
        super(Comment, self).save(*args, **kwargs)

    def __str__(self):
        return self.owner.username + '-' + self.comment_text + '-' + self.status


class Assumption(models.Model):
    geom = models.PointField(null=False)
    text = models.TextField()
    status = models.CharField(max_length=254, null=True)
    generation = models.CharField(max_length=40, null=True, blank=True)
    responses = GenericRelation(Response)
    num_responses = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.id) + '-' + self.text + '-' + self.status


class Question(models.Model):
    geom = models.PolygonField(null=False)
    text = models.TextField()
    status = models.CharField(max_length=254, null=True)
    generation = models.CharField(max_length=40, null=True, blank=True)
    responses = GenericRelation(Response)
    num_responses = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.id) + '-' + self.text + '-' + self.status
