from django.db import models
from django.utils import timezone
from datetime import datetime
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

class RentReceipt(models.Model):
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='receipt_owner', default = None)
    apartment_receipt = models.ForeignKey(Apartment, related_name='apartment_receipt', on_delete=models.CASCADE, default = None)
    number = models.IntegerField(default = 0, unique = True)
    date = models.DateField(auto_now_add=False)
    recident_name = models.CharField(max_length=40)
    net_amount = models.DecimalField(max_digits= 20, decimal_places=2)
    expenses = models.DecimalField(max_digits= 20, decimal_places=2)
    expiry_date = models.DateField(auto_now_add=False)
    phone_number = models.IntegerField(default = None, null = True, blank = True)

class PrivNotices(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    owner_sender = models.ForeignKey('users.User',related_name='sender',  on_delete=models.CASCADE, default = None)
    apartment_resipient = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name='received_messages', default = None)
    message = models.TextField(max_length=400, blank = True)
    image = models.ImageField(upload_to='media', blank= True, null= True, default = None)
    rent_receipt = models.ForeignKey(RentReceipt, blank = True, null = True, default = None, on_delete=models.CASCADE)


class JoiningRequest(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name= "senders")
    recipient = models.ForeignKey('users.User',on_delete = models.CASCADE, related_name = "recipient")
    condominium = models.ForeignKey(Condominium, on_delete=models.CASCADE, related_name="origin")
    apartment = models.ForeignKey(Apartment, on_delete = models.CASCADE, related_name = "my_apartment")
    active = models.BooleanField(default=True)
    rejected = models.BooleanField(default= False)

    def accept_invitation(self):
        self.active = False
        self.save()

    def reject_invitation(self):
        self.active = False
        self.rejected = True
        self.save()
        



    
    