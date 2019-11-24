from django.contrib.gis.db import models
from datetime import datetime as dt
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation
from django.db.models.signals import post_save, post_delete


def update_response_counts(sender, instance, **kwargs):
    """
    Update response counts for comments, questions, and assumptions when
    respones get saved/deleted.
    """
    target = instance.target_object
    # Don't update counts if the target was already deleted
    if target is not None:
        target.num_responses = len(target.responses.all())
        target.save()
    # print (target, '# of responses = ',  target.num_responses)


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


post_save.connect(update_response_counts, sender=Response)
# post_delete caused issues when deleting target objects
# pre_delete.connect(update_response_counts, sender=Response)
post_delete.connect(update_response_counts, sender=Response)


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
    num_responses = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        self.author = self.owner.first_name + ' ' + self.owner.last_name
        # was overwriting timestamp on any save
        # self.time_stamp = dt.now()
        super(Comment, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.id) + ' ' + self.owner.username + '-' + \
               self.comment_text + '-' + self.status


class Assumption(models.Model):
    geom = models.PointField(null=False)
    text = models.TextField()
    status = models.CharField(max_length=254, null=True)
    generation = models.CharField(max_length=40, null=True, blank=True)
    responses = GenericRelation(Response)
    num_responses = models.IntegerField(default=0)

    def __str__(self):
        return str(self.id) + '-' + self.text + '-' + self.status


class Question(models.Model):
    geom = models.PolygonField(null=False)
    text = models.TextField()
    status = models.CharField(max_length=254, null=True)
    generation = models.CharField(max_length=40, null=True, blank=True)
    responses = GenericRelation(Response)
    num_responses = models.IntegerField(default=0)

    def __str__(self):
        return str(self.id) + '-' + self.text + '-' + str(self.status) + \
            '/' + str(self.num_responses)
