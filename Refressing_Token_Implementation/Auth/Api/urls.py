from django.urls import path
from .views import *

urlpatterns = [
  path('', getRoutes, name="get-routes"),
  path('get-notes/', getNotes, name="get-notes"),
  path('register/user/', RegisteUserView.as_view(), name="register-user"),
]