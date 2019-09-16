from django.shortcuts import render
# tutorial imports
#from django.contrib.auth.models import User, Group
#from rest_framework import viewsets
#from .serializers import UserSerializer, GroupSerializer

# my imports
#from django.http import HttpResponse, JsonResponse
#from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import permissions,  generics
from rest_framework.response import Response
from comment.models import Comment
from comment.serializers import CommentSerializer, UserSerializer
from comment.permissions import IsOwnerOrReadOnly

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

#@csrf_exempt
#@api_view(['GET', 'POST'])
#@permission_classes((permissions.AllowAny,))
#def comment_list(request, format=None):
#    """
#    List all comments, or create a new comment.
#    """
#    if request.method == 'GET':
#        comments = Comment.objects.all()
#        serializer = CommentSerializer(comments, many=True)
#        return Response(serializer.data)
#
#    elif request.method == 'POST':
#        serializer = CommentSerializer(data=request.data)
#        if serializer.is_valid():
#            serializer.save()
#            return Response(serializer.data, status=status.HTTP_201_CREATED)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#    if request.method == 'GET':
#        comments = Comment.objects.all()
#        serializer = CommentSerializer(comments, many=True)
#        return JsonResponse(serializer.data, safe=False)
#
#    elif request.method == 'POST':
#        data = JSONParser().parse(request)
#        serializer = CommentSerializer(data=data)
#        if serializer.is_valid():
#            serializer.save()
#            return JsonResponse(serializer.data, status=201)
#        return JsonResponse(serializer.errors, status=400)
#
#@csrf_exempt
#def comment_detail(request, pk):
#    """
#    Retrieve, update or delete a code comment.
#    """
#    try:
#        comment = Comment.objects.get(pk=pk)
#    except Comment.DoesNotExist:
#        return HttpResponse(status=404)
#
#    if request.method == 'GET':
#        serializer = CommentSerializer(comment)
#        return JsonResponse(serializer.data)
#
#    elif request.method == 'PUT':
#        data = JSONParser().parse(request)
#        serializer = CommentSerializer(comment, data=data)
#        if serializer.is_valid():
#            serializer.save()
#            return JsonResponse(serializer.data)
#        return JsonResponse(serializer.errors, status=400)
#
#    elif request.method == 'DELETE':
#        comment.delete()
#        return HttpResponse(status=204)
#
# Tutorial stuff
# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
# 
# 
# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
# 
