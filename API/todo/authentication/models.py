from datetime import datetime
from datetime import timedelta
from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
import jwt
# Create your models here.

# Вроде как Django рекомендует использовать внитри класса перечисление,
# но с точки зрения универсальности есть смысл использовать на верхнем уровне


class Departament(models.TextChoices):
    DESIGN = 'DESIGN', ('Дизаин')
    FRONTEND = "FRONT", ('Фронтенд')
    BACKEND = "BACK", ('Бэкенд')


class TodoUserManager(BaseUserManager):
    # Для создания менеджера необходимо определить обязательно два метода

    def create_user(self, username, email,  password, first_name):
        # Возможно стоит добавить проверку на отсутсвие и username и email
        """ Создает и возвращает пользователя с емэйлом, паролем и именем. """
        if not first_name:
            raise ValueError('Необходимо указать имя!')

        if not username:
            raise ValueError('Необходимо указать логин!')

        if not email:
            raise ValueError('Необходимо указать эл.почту!')

        user = self.model(username=username, first_name=first_name,
                          email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password, first_name):
        """ Создает и возввращет пользователя с привилегиями суперадмина. """
        if password is None:
            raise TypeError('Superusers must have a password.')
        user = self.create_user(username, email, password, first_name)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class TodoUser(AbstractBaseUser, PermissionsMixin):
    # Каждому пользователю нужен понятный человеку уникальный идентификатор,
    # который мы можем использовать для предоставления User в пользовательском
    # интерфейсе. Мы так же проиндексируем этот столбец в базе данных для
    # повышения скорости поиска в дальнейшем.
    first_name = models.CharField(blank=False,
                                  max_length=100)
    username = models.CharField(
        db_index=True, max_length=100, unique=True, blank=True)
    departament = models.CharField(
        max_length=30, choices=Departament.choices, default=Departament.DESIGN, verbose_name='Направление')
    # Так же мы нуждаемся в поле, с помощью которого будем иметь возможность
    # связаться с пользователем и идентифицировать его при входе в систему.
    # Поскольку адрес почты нам нужен в любом случае, мы также будем
    # использовать его для входы в систему, так как это наиболее
    # распространенная форма учетных данных на данный момент (ну еще телефон).
    email = models.CharField(max_length=255, unique=True)

    send_task = models.BooleanField(
        default=True, verbose_name='Получение рассылки на задачу')
    # Когда пользователь более не желает пользоваться нашей системой, он может
    # захотеть удалить свой аккаунт. Для нас это проблема, так как собираемые
    # нами данные очень ценны, и мы не хотим их удалять :) Мы просто предложим
    # пользователям способ деактивировать учетку вместо ее полного удаления.
    # Таким образом, они не будут отображаться на сайте, но мы все еще сможем
    # далее анализировать информацию.
    is_active = models.BooleanField(default=True)

    # Этот флаг определяет, кто может войти в административную часть нашего
    # сайта. Для большинства пользователей это флаг будет ложным.
    is_staff = models.BooleanField(default=False)

    # Временная метка создания объекта.
    created_at = models.DateTimeField(auto_now_add=True)

    # Временная метка показывающая время последнего обновления объекта.
    updated_at = models.DateTimeField(auto_now=True)

    # Дополнительный поля, необходимые Django
    # при указании кастомной модели пользователя.

    # Свойство USERNAME_FIELD сообщает нам, какое поле мы будем использовать
    # для входа в систему. В данном случае мы хотим использовать почту.
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name']

    # Сообщает Django, что определенный выше класс UserManager
    # должен управлять объектами этого типа.
    objects = TodoUserManager()

    def __str__(self):
        """ Строковое представление модели (отображается в консоли) """
        return self.email

    @property
    def token(self):
        """
        Позволяет получить токен пользователя путем вызова user.token, вместо
        user._generate_jwt_token(). Декоратор @property выше делает это
        возможным. token называется "динамическим свойством".
        """
        return self._generate_jwt_token()

    def get_full_name(self):
        """
        Этот метод требуется Django для таких вещей, как обработка электронной
        почты. Обычно это имя фамилия пользователя, но поскольку мы не
        используем их, будем возвращать username.
        """
        return self.username

    def _generate_jwt_token(self):
        """
        Генерирует веб-токен JSON, в котором хранится идентификатор этого
        пользователя, срок действия токена составляет 1 день от создания
        """
        dt = datetime.now() + timedelta(days=1)

        token = jwt.encode({

            'id': self.pk,
            'exp': int(dt.strftime('%S'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.encode().decode('utf-8')
