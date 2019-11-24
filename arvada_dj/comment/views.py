from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response as DRF_Response
from rest_framework.permissions import IsAuthenticated

from comment.models import Comment, Response, Assumption, Question
from comment.serializers import CommentSerializer, UserSerializer
from comment.serializers import ResponseSerializer, ResponsePostSerializer
from comment.permissions import IsOwnerOrReadOnly

from datetime import datetime as dt


def user_is_RESPEC(user):
    """ Returns true if logged in user is in the RESPEC group """
    # Update the below code to search all groups
    try:
        return user.groups.all()[0].name == 'RESPEC'
    except IndexError:
        return False


class ResponseList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        responses = Response.objects.all()
        serializer = ResponseSerializer(responses, many=True)
        return DRF_Response(serializer.data)

    def post(self, request, format=None):
        serializer = ResponsePostSerializer(data=request.data)
        if serializer.is_valid():
            response = serializer.save(owner=self.request.user)

            # Use GET serializer for response
            return DRF_Response(ResponseSerializer(response).data,
                                status=status.HTTP_201_CREATED)
        return DRF_Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class ResponseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Set current user to owner of comment
        serializer.save(owner=self.request.user)


@user_passes_test(user_is_RESPEC)
@login_required
def close_comm_item(request, object_type=None, object_id=None):
    if object_type == 'comment':
        target = get_object_or_404(Comment, id=object_id)
    elif object_type == 'assumption':
        target = get_object_or_404(Assumption, id=object_id)
    elif object_type == 'question':
        target = get_object_or_404(Question, id=object_id)
    else:
        raise NotImplementedError('Object type: ' + object_type +
                                  ' is not supported.')
    target.status = 'closed'
    target.save()
    return HttpResponse(f'Success! {object_type}-{object_id}')


class ResponsesByObject(generics.ListAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        if self.kwargs['object_type'] == 'comment':
            target = Comment.objects.get(id=self.kwargs['object_id'])
        elif self.kwargs['object_type'] == 'assumption':
            target = Assumption.objects.get(id=self.kwargs['object_id'])
        elif self.kwargs['object_type'] == 'question':
            target = Question.objects.get(id=self.kwargs['object_id'])
        else:
            raise NotImplementedError('Object type: ' +
                                      self.kwargs['object_type'] +
                                      ' is not supported.')
        return target.responses.all()


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Set current user to owner of comment
        serializer.save(owner=self.request.user, time_stamp=dt.now())


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Set current user to owner of comment
        serializer.save(owner=self.request.user)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
