from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=200)
  body = models.CharField(max_length=200)
  created_at = models.DateField(auto_now=True)
  updated_at = models.DateField(auto_now_add=True)
  
  def __str__(self) -> str:
    return self.title
  
