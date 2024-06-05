from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Note


class UserSerializer(ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'email', 'password']
    
  def create(self, validated_data):
    password = validated_data.pop("password",None)
    user = self.Meta.model(**validated_data)
    if password is not None:
      user.set_password(password)
    user.save()
      
    return user
      
class NoteSerializer(ModelSerializer):
  class Meta:
    model = Note
    fields = '__all__'