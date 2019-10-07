from django.contrib.auth.models import User# Group
from rest_framework import serializers
from comment.models import Comment, Response


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comment
        fields = ['id', 'owner', 'geom', 'author', 'comment_text', 'status', ]


class ResponseSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Response
        fields = ['id', 'owner', 'author', 'text', 'time_stamp',]
                  #'target_object']


class UserSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(many=True,
                                            queryset=Comment.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'comments']
