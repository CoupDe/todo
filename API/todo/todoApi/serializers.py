from dataclasses import field
from rest_framework import serializers
from authentication.models import TodoUser

from authentication.serializers import TodoUserSerializer

from .models import Task, TaskComment


class CommentTaskSerializers(serializers.ModelSerializer):

    class Meta:
        model = TaskComment
        fields = ['description', 'created_at']


class CommentListSerializers(serializers.ModelSerializer):
    comment_task = serializers.CharField(
        source='comment_task.pk', read_only=True)
    comment_creator = serializers.CharField(
        source='comment_creator.first_name', read_only=True)
    created_at = serializers.DateTimeField(
        format="%d.%m.%y/%H:%M", read_only=True)

    class Meta:
        model = TaskComment
        fields = ['description',  'comment_task', 'id',
                  'comment_creator', 'created_at']


class TaskListSerializers(serializers.ModelSerializer):
    # Вывод задачи с комментариями
    creator = serializers.CharField(
        source='creator.first_name', read_only=True)
    # comments = CommentListSerializers(many=True)

    created_at = serializers.DateTimeField(
        format="%d.%m.%y/%H:%m", read_only=True)

    class Meta:
        model = Task
        fields = ['short_description', 'id',
                  'importance_task', 'updated_at', 'created_at', 'isComplete', 'creator']


# Задача с комментариями


class TaskSerializers(serializers.ModelSerializer):
    # Вывод задачи с комментариями
    task_creator = serializers.CharField(source='task_creator.first_name')
    # comments = CommentListSerializers(many=True)
    comments = serializers.SerializerMethodField()

    created_at = serializers.DateTimeField(
        format="%d.%m.%y/%H:%m", read_only=True)

    class Meta:
        model = Task
        fields = ['short_description', 'id',
                  'importance_task', 'updated_at', 'created_at', 'isComplete', 'task_creator',  'comments']

    def get_comments(self, instance):
        comments = instance.comments.order_by('-created_at')
        return CommentListSerializers(comments, many=True).data

# Create Task


class TaskCreateSerializers(serializers.ModelSerializer):

    # task_creator = serializers.CharField(read_only=True)
    # departament = serializers.CharField(read_only=True)

    class Meta:
        model = Task
        fields = ['short_description',
                  'task_creator', 'departament', 'short_description',
                  'description',
                  'importance_task']


# Create Comment


class CommentSerializers(serializers.ModelSerializer):
    comment_task = serializers.CharField(write_only=True)
    comment_creator = serializers.CharField(write_only=True)

    class Meta:
        model = TaskComment
        fields = ['description', 'id',
                  'updated_at', 'created_at',  'comment_task', 'comment_creator']
# Можно получить user из  self.request.user в perform_create

    def create(self, validated_data):
        validated_data['comment_creator'] = self.context['user_instance']
        validated_data['comment_task'] = self.context['task_instance']
        return TaskComment.objects.create(**validated_data)
