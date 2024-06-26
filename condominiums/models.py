from django.db import models
from django.utils import timezone
from datetime import datetime
from django.core.validators import FileExtensionValidator
# Create your models here.


class Condominium(models.Model):
    condominium_name = models.CharField(max_length=100)
    condominium_location = models.CharField(max_length=100, unique=True)
    owner = models.ForeignKey(
        'users.User', related_name="owned_condominiums", on_delete=models.CASCADE)


class Apartment(models.Model):
    rooms_number = models.BigIntegerField(default=1)
    condominium = models.ForeignKey(
        Condominium, on_delete=models.CASCADE, related_name="apartment_condominium")
    renters = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="renters", default=None, null=True)
    number = models.CharField(max_length=20)


class GroupNotices(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE)
    message = models.TextField(max_length=400, blank=True)
    image = models.ImageField(
        upload_to='media', blank=True, null=True, default=None)
    condominium = models.ForeignKey(
        Condominium, related_name="group_notices", on_delete=models.CASCADE)


class RentReceipt(models.Model):
    owner = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='receipt_owner', default=None)
    apartment_recipient = models.ForeignKey(
        Apartment, related_name='apartment_receipt', on_delete=models.CASCADE, default=None)
    number = models.IntegerField(default=0, unique=True)
    date = models.DateField(auto_now_add=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    recident_name = models.CharField(max_length=40)
    net_amount = models.DecimalField(max_digits=20, decimal_places=3)
    expenses = models.DecimalField(max_digits=20, decimal_places=3)
    expire_date = models.DateField(auto_now_add=False)
    total_amount = models.DecimalField(
        max_digits=20, decimal_places=3, default=None)
    phone_number = models.CharField(
        default=None, null=True, blank=True, max_length=255)


class PrivNotices(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    owner_sender = models.ForeignKey(
        'users.User', related_name='sender',  on_delete=models.CASCADE, default=None)
    apartment_recipient = models.ForeignKey(
        Apartment, on_delete=models.CASCADE, related_name='received_messages', default=None)
    message = models.CharField(max_length=2000)


class PrivImages(models.Model):
    title = models.CharField(max_length=60, blank=False, default=None, null=True)
    image = models.ImageField(
        upload_to='media', blank=False, null=False, default=None)
    timestamp = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE,
                              related_name='receipt_owner_image', default=None)
    apartment_recipient = models.ForeignKey(
        Apartment, related_name='apartment_receipt_image', on_delete=models.CASCADE, default=None)


class Files(models.Model):
    files = models.FileField(
        default=None,
        null=False,
        blank=False,
        
    )
    title = models.CharField(max_length=60, default=None, blank=True, null=True)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE,
                              related_name='files_owner', default=None)
    apartment_recipient = models.ForeignKey(
        Apartment, related_name='files_apartment', on_delete=models.CASCADE, default=None)
    timestamp = models.DateTimeField(auto_now_add=True)


class JoiningRequest(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name="senders")
    recipient = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name="recipient")
    condominium = models.ForeignKey(
        Condominium, on_delete=models.CASCADE, related_name="origin")
    apartment = models.ForeignKey(
        Apartment, on_delete=models.CASCADE, related_name="my_apartment")
    active = models.BooleanField(default=True)
    rejected = models.BooleanField(default=False)

    def accept_invitation(self):
        self.active = False
        self.save()

    def reject_invitation(self):
        self.active = False
        self.rejected = True
        self.save()
