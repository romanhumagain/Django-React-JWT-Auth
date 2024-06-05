from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from rest_framework import status

import jwt, datetime

User = get_user_model()

class UserRegisterView(APIView):
  def post(self, request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request):
        data = request.data
        email = data['email']
        password = data['password']
        
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed("Username not found!")
        
        user = authenticate(email=email, password=password)
        if user is None:
            raise AuthenticationFailed("Invalid Password")
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()
        response.set_cookie(key="jwt", value=token,httponly=True, samesite='None', secure=True)

        response.data = {
            'jwt': token,
        }
        return response
      
  
class UserView(APIView):
    def get(self, request):
    
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed("Unauthenticated User!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated User! Token has expired.")
        
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Unauthenticated User! Invalid token.")
        
        user = User.objects.get(id=payload['id'])
        
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

class LogoutView(APIView):
    def post(self, request):
        response = Response({
            'message': "Successfully logged out!"
        }, status=status.HTTP_200_OK)
        response.delete_cookie('jwt', path='/', samesite='None')
        
        return response
    
    
# ===== for testing the cooking related task =====
def get_cookie(request):
    cookie_value = request.COOKIES.get('jwt')
    if cookie_value:
        return HttpResponse(f'Cookie value is: {cookie_value}')
    else:
        return HttpResponse('Cookie not found!')
    
def delete_cookie(request):
    response = HttpResponse()
    response.delete_cookie('jwt', path='/', samesite='None')
    
    response.data = {
      'message':"Successfully Logout!"
    }
    
    return response