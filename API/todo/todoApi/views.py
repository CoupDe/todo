from urllib import response
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from authentication.models import TodoUser
from .models import Task, TaskComment
from .serializers import CommentListSerializers, CommentSerializers, TaskListSerializers, TaskSerializers
from rest_framework import status


class TaskList(generics.ListCreateAPIView):
    # (IsAuthenticated,)
    permission_classes = (AllowAny,)
    queryset = Task.objects.all()
    serializer_class = TaskListSerializers


class TaskRetriveUpdate(generics.RetrieveUpdateAPIView):
    # Так как это ленивый запрос(обрабатывается только по запросоу) вернется единичный запрос
    permission_classes = (AllowAny,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializers


class TaskCommentCreate(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CommentSerializers

    def perform_create(self, serializer):
        task = Task.objects.get(pk=self.request.data['comment_task'])
        serializer = CommentSerializers(data=self.request.data, context={
                                        'user_instance': self.request.user, 'task_instance': task})
        serializer.is_valid()
        serializer.save()


class TaskCommentList(generics.ListAPIView):
    permission_classes = (AllowAny,)
    # queryset = TaskComment.objects.all()
    serializer_class = CommentListSerializers

    def get_queryset(self):
        queryset = TaskComment.objects.filter(comment_task=self.kwargs['pk'])
        print(queryset)
        return queryset.order_by('-created_at')

    # def get(self, request, pk, *args, **kwargs):

    #     taskComment = self.queryset.filter(comment_task=pk)
    #     print(taskComment)
    #     return self.list(request, *args, **kwargs)

    # def post(self, request, pk):

    #     user = TodoUser.objects.get(pk=request.data['comment_creator'])

    #     print('user', user)
    #     return Response({'title': 'Jennifer Shrader Lawrence'})
