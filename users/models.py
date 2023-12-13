from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
import re
from condominiums.models import Condominium, Apartment
# Create your models here.
class CustomUserManager(UserManager):

    def _create_user(self, email, password, **extra_fields):
        if not email :
            raise ValueError("Please provide an email address")
        
        email =  self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_user(self, email = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        return self._create_user(email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique = True)
    condominiums = models.ManyToManyField(Condominium, blank=True)
    phone_number = models.BigIntegerField()
    date_joined = models.DateTimeField(default = timezone.now)
    apartment = models.ForeignKey(Apartment, null = True, default= None, on_delete= models.SET_DEFAULT)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
        
    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return f'{self.email}'



    

    
    
    



