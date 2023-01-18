from django.urls import URLPattern, include, path

from .views import *

urlpatterns = [
    path('v1/tasklist/', TaskList.as_view(), name='TaskList'),
    path('v1/tasklist/create/', TaskCreate.as_view(), name='TaskCreate'),
    path('v1/task/<int:pk>', TaskRetriveUpdate.as_view(), name='Task'),
    path('v1/task/<int:pk>/comment/',
         TaskCommentCreate.as_view(), name='TaskCommentCreate'),
    path('v1/task/<int:pk>/comment/1',
         TaskCommentList.as_view(), name='TaskCommentList'),

]
