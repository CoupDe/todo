from django.urls import URLPattern, include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import *

app_name = 'authentication'
urlpatterns = [

    path('register/', RegisterUserView.as_view(), name='register_user'),
    # path('login/', LoginView.as_view(), name='register_user'),
    path('list/', UserlistView.as_view(), name='user_list'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
