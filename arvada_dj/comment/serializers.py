from django.contrib.auth.models import User, Group
from rest_framework import serializers
from comment.models import Comment

# Stuff from tutorial
#class UserSerializer(serializers.HyperlinkedModelSerializer):
#    class Meta:
#        model = User
#        fields = ['url', 'username', 'email', 'groups']
#
#class GroupSerializer(serializers.HyperlinkedModelSerializer):
#    class Meta:
#        model = Group
#        fields = ['url', 'name']

# Comment stuff
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'geom', 'author', 'comment_text', 'status', 
                    'time_stamp' ]

class UserSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(many=True, 
                    queryset=Comment.objects.all())
    class Meta:
        model = User
        fields = ['id', 'username', 'comments']

