from email.policy import default
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import MyTokenObtainPairSerializer, RegisterUserSerializer, TodoUserSerializer
from rest_framework.response import Response
from .models import TodoUser
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.


class UserlistView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, ]
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserSerializer


class RegisterUserView(generics.CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = RegisterUserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request):
        user = request.data
        # Поставить признак передаваемого поля (EMAIL или USERNAME)

        serializer = self.serializer_class(data=user)

        # указанный параметр вызвает описание ошибки из сериализатора данного view serializers.ValidationError
        serializer.is_valid(raise_exception=True)
        print('data', serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK)
