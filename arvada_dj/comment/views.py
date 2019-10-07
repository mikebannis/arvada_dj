from django.contrib.auth.models import User
#from django.utils.decorators import method_decorator
#from rest_framework import permissions,
from rest_framework import generics
#from rest_framework.response import Response
from comment.models import Comment, Response
from comment.serializers import CommentSerializer, UserSerializer
from comment.serializers import ResponseSerializer
from comment.permissions import IsOwnerOrReadOnly

class ResponseList(generics.ListCreateAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer
    permission_classes = [#permissions.IsAuthenticatedOrReadOnly,
                            IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Set current user to owner of comment
        serializer.save(owner=self.request.user)

class ResponseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer
    permission_classes = [#permissions.IsAuthenticatedOrReadOnly,
                            IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Set current user to owner of comment
        serializer.save(owner=self.request.user)

class CommentResponses(generics.ListAPIView):
    #queryset = Response.objects.get()
    serializer_class = ResponseSerializer
    #permission_classes = [#permissions.IsAuthenticatedOrReadOnly,
                            #IsOwnerOrReadOnly]

    def get_queryset(self):
        comment = Comment.objects.get(id=self.kwargs['comment_id'])
        return comment.responses.all()

#@method_decorator(csrf_exempt, name='dispatch')
class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [#permissions.IsAuthenticatedOrReadOnly,
                            IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Set current user to owner of comment
        serializer.save(owner=self.request.user)

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [#permissions.IsAuthenticatedOrReadOnly,
                            IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Set current user to owner of comment
        serializer.save(owner=self.request.user)

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

