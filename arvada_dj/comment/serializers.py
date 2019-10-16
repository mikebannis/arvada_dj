from django.contrib.auth.models import User
from rest_framework import serializers
from comment.models import Comment, Response, Assumption, Question


class ResponseSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    author_name = serializers.ReadOnlyField()
    time_stamp = serializers.ReadOnlyField()

    class Meta:
        model = Response
        fields = ['id', 'owner', 'author_name', 'text', 'time_stamp', ]


class ResponsePostSerializer(serializers.Serializer):
    # target_type is either 'comment', 'assumption', or 'question' and
    # indicates the type of object to link to
    target_type = serializers.CharField()
    target_id = serializers.IntegerField()
    text = serializers.CharField()

    def create(self, validated_data):
        # Grab the target object for the response
        if validated_data['target_type'] == 'comment':
            target = Comment.objects.get(id=validated_data['target_id'])
        elif validated_data['target_type'] == 'assumption':
            target = Assumption.objects.get(id=validated_data['target_id'])
        elif validated_data['target_type'] == 'question':
            target = Question.objects.get(id=validated_data['target_id'])
        else:
            raise NotImplemented('Target type: ' + validated_data['target_type'] +
                                 ' is not supported.')

        validated_data['target_object'] = target
        del validated_data['target_id']
        del validated_data['target_type']
        return Response.objects.create(**validated_data)


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comment
        # owner, author, and status are unnecessary for creating comments and
        # should be removed
        fields = ['id', 'owner', 'geom', 'author', 'comment_text', 'status', ]


class UserSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(many=True,
                                            queryset=Comment.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'comments']
