import jwt
from django.db.models import Q
from django.conf import settings
from rest_framework import authentication, exceptions
from django.contrib.auth.backends import ModelBackend
from .models import TodoUser
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model
USER = get_user_model()


class TodoUserBackend(ModelBackend):
    # Для создания аутентификации необходимо прописать катстомный ModelBackend в AUTHENTICATION_BACKENDS

    def authenticate(self, request, login_field=None, password=None, **kwargs):
        # print('Wow this is my auth', login_field)
        try:
            user = USER.objects.get(
                Q(email=login_field) | Q(username=login_field)
            )

        except TodoUser.DoesNotExist:
            return
        if user.check_password(password):
            return user

    def authenticate_header(self, token):
        return token

    def get_user(self, user_id):
        return TodoUser.objects.get(pk=user_id)
