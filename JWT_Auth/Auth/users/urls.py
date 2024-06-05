from django.urls import path
from .views import UserRegisterView, UserLoginView, UserView, LogoutView, get_cookie, delete_cookie

urlpatterns = [
  path('register-user/', UserRegisterView.as_view(), name='register-user'),
  path('login-user/', UserLoginView.as_view(), name='login-user'),
  path('user/', UserView.as_view(), name='user'),
  path('logout/user/', LogoutView.as_view(), name='logout-user'),
  path('get-cookie/',get_cookie ),
  path('delete-cookie/',delete_cookie ),
  
]