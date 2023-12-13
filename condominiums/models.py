from django.db import models
from django.utils import timezone
# Create your models here.
class Condominium(models.Model):
    condominium_name = models.CharField(max_length=100)
    condominium_location = models.CharField(max_length=100, unique=True)
    owner = models.ForeignKey('users.User', related_name = "owned_condominiums", on_delete=models.CASCADE)  

class Apartment(models.Model):
    rooms_number = models.BigIntegerField(default = 1)
    condominium = models.ForeignKey(Condominium, on_delete=models.CASCADE, related_name="apartment_condominium")
    renters = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="renters", default = None, null = True)
    number = models.CharField(max_length=20)

class GroupNotices(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE)
    message = models.TextField(max_length=400, blank = True)
    image = models.ImageField(upload_to='media', blank= True, null= True, default = None)
    condominium = models.ForeignKey(Condominium, related_name="group_notices", on_delete = models.CASCADE)

class PrivNotices(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField(max_length=400, blank = True)
    image = models.ImageField(upload_to='media', blank= True, null= True, default = None)

