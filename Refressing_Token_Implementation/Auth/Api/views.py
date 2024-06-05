from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Note
from .serializer import NoteSerializer, UserSerializer

from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# to add some custom data inside the access token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username,
        token['email'] = user.email
        

        return token
      
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def getRoutes(request):
  routes = [
    "api/token", 
    "api/token/refresh"
  ]
  
  return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
  if request.method == "GET":
    user = request.user
    
    notes = Note.objects.filter(user=user)
    serializer = NoteSerializer(notes, many = True)
    
    return Response(serializer.data ,)
  
  
class RegisteUserView(APIView):
  permission_classes = [AllowAny]
  
  def post(self, request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors)
    
    
    
    
  