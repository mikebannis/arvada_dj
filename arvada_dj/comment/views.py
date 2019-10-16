from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response as DRF_Response
from rest_framework.permissions import IsAuthenticated

from comment.models import Comment, Response
from comment.serializers import CommentSerializer, UserSerializer
from comment.serializers import ResponseSerializer, ResponsePostSerializer
from comment.permissions import IsOwnerOrReadOnly


class ResponseList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        responses = Response.objects.all()
        serializer = ResponseSerializer(responses, many=True)
        return DRF_Response(serializer.data)

    def post(self, request, format=None):
        serializer = ResponsePostSerializer(data=request.data)
        if serializer.is_valid():
            response = serializer.save()

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


class CommentResponses(generics.ListAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        comment = Comment.objects.get(id=self.kwargs['comment_id'])
        return comment.responses.all()


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Set current user to owner of comment
        serializer.save(owner=self.request.user)


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
