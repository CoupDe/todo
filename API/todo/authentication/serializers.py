from asyncio.windows_events import NULL
from email.policy import default
from lib2to3.pgen2 import token
from typing_extensions import Required
from rest_framework import serializers
from .models import TodoUser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Костыль!!! не спрятать поле т.к. оно указано в модели user USERNAME_FIELD а аутентификация
    # происходит по другому полю
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'] = serializers.CharField(
            read_only=True)
        self.fields['first_name'] = serializers.CharField(
            read_only=True)
        self.fields['id'] = serializers.CharField(
            read_only=True)

    email = serializers.EmailField(
        max_length=255, read_only=True)

    login_field = serializers.CharField(max_length=255, required=False)

    password = serializers.CharField(max_length=128,
                                     min_length=8,
                                     write_only=True)
    access = serializers.CharField(max_length=255, read_only=True)
    refresh = serializers.CharField(max_length=255, read_only=True)

    def get_token(self, user):
        return RefreshToken.for_user(user)

    def validate(self, data):
        dataRequest = {}

        # В методе validate мы убеждаемся, что текущий экземпляр
        # LoginSerializer значение valid. В случае входа пользователя в систему
        # это означает подтверждение того, что присутствуют адрес электронной
        # почты и то, что эта комбинация соответствует одному из пользователей.
        login_field = data.get('login_field', None)

        password = data.get('password', None)

        if not login_field:
            # для передачи вывода данного exception необходимо во view вызвать параметр is_valid(raise_exception=True)
            raise serializers.ValidationError(
                {'detail': 'Необходимо указать эл.почту или имя пользователя'})

        if password is None:
            raise serializers.ValidationError('Необходимо указать пароль')

        # Для использования кастомного метода authenticate необходимо переопределить BACKEND и прописать в settings DRF
        user = authenticate(login_field=login_field, password=password)
        if user is not None:
            refresh = self.get_token(user)
            dataRequest['username'] = user.get_username
            dataRequest['access'] = str(refresh.access_token)
            dataRequest['refresh'] = str(refresh)
            dataRequest['first_name'] = user.first_name
            dataRequest['id'] = user.pk

        if user is None:
            raise serializers.ValidationError(
                {'detail': 'Пользователь с указанными данными не найден'}
            )

        # Django предоставляет флаг is_active для модели User. Его цель
        # сообщить, был ли пользователь деактивирован или заблокирован.
        # Проверить стоит, вызвать исключение в случае True.
        if not user.is_active:
            raise serializers.ValidationError(
                {'detail': 'Пользователь заблокирован'}
            )

        return dataRequest

# Получения списка пользователей


class TodoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ['id', 'first_name', 'username',
                  'email', 'departament']

# Регистрация кастомного юзера

# Добавить несколько полей при регистрации (получать рассылку и выбор департамента при регистрации)

# Сериализатор регистрации


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True  # Может быть только написан, чтение запрещено
    )
    # Клиентская сторона не должна иметь возможность отправлять токен вместе с
    # запросом на регистрацию. Сделаем его доступным только на чтение.
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = TodoUser
        # Перечислить все поля, которые могут быть включены в запрос
        # или ответ, включая поля, явно указанные выше.
        fields = ['email', 'username', 'first_name',
                  'password', 'token']

    def create(self, validated_data):
        validated_data['first_name'] = validated_data['first_name'].capitalize()
        # Использовать метод create_user, который мы
        # написали ранее, для создания нового пользователя.
        return TodoUser.objects.create_user(**validated_data)

# Сериализатор аутентификации


# class LoginSerializer(serializers.Serializer):

#     # required - не обязательное поле для заполнения
#     login_field = serializers.CharField(max_length=255, required=False)
#     email = serializers.EmailField(max_length=255, read_only=True)
#     username = serializers.CharField(max_length=255, read_only=True)
#     password = serializers.CharField(max_length=128,
#                                      min_length=8,
#                                      write_only=True)
#     token = serializers.CharField(max_length=255, read_only=True)

#     def validate(self, data):

#         # В методе validate мы убеждаемся, что текущий экземпляр
#         # LoginSerializer значение valid. В случае входа пользователя в систему
#         # это означает подтверждение того, что присутствуют адрес электронной
#         # почты и то, что эта комбинация соответствует одному из пользователей.
#         login_field = data.get('login_field', None)

#         password = data.get('password', None)

#         if not login_field:
#             # для передачи вывода данного exception необходимо во view вызвать параметр is_valid(raise_exception=True)
#             raise serializers.ValidationError(
#                 {'detail': 'Необходимо указать эл.почту или имя пользователя'})

#         if password is None:
#             raise serializers.ValidationError('Необходимо указать пароль')

#         # Для использования кастомного метода authenticate необходимо переопределить BACKEND и прописать в DRF
#         user = authenticate(login_field=login_field, password=password)
#         if user is None:
#             raise serializers.ValidationError(
#                 {'detail': 'Пользователь с указанными данными не найден'}
#             )

#         # Django предоставляет флаг is_active для модели User. Его цель
#         # сообщить, был ли пользователь деактивирован или заблокирован.
#         # Проверить стоит, вызвать исключение в случае True.
#         if not user.is_active:
#             raise serializers.ValidationError(
#                 {'detail': 'Пользователь заблокирован'}
#             )

#         return {
#             'email': user.email,
#             'username': user.username,
#             'token': user.token
#         }
