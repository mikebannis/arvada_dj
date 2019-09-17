from django.contrib.auth.models import User, Group
from rest_framework import serializers
from comment.models import Comment

# Comment stuff
class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    #author = serializers.ReadOnlyField(source='owner.username') # not working!
    class Meta:
        model = Comment
        #fields = ['id', 'owner',  'author', 'comment_text', 'status', ]
        fields = ['id', 'owner', 'geom', 'author', 'comment_text', 'status', ]
                    #'time_stamp' ]

class UserSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(many=True, 
                    queryset=Comment.objects.all())
    class Meta:
        model = User
        fields = ['id', 'username', 'comments']

