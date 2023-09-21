from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
import re
from phonenumber_field.modelfields import PhoneNumberField
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
    
    def create_superuser(self, email = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        return self._create_user(email, password, **extra_fields)
    
    
class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique = True)
    phone_number = PhoneNumberField()
    cuil = models.CharField(max_length=13, unique=True)
    date_joined = models.DateTimeField(default = timezone.now)
    is_staff = models.BooleanField(default = False)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
        
    class Meta:

        ordering = ['-date_joined']

    def _validate_cuil(self, cuil):
        #validate the Argentinian format cuil
        cuil_pattern = r'^\d{2}-\d{8}-\d{1}$'
        if cuil and not re.match(cuil_pattern, cuil):
            raise ValueError("The cuil has to be whit the correct format(XX-XXXXXXXX-X)")

    def save(self, *args, **kwargs):
        # Validate the cuil before saving
        self._validate_cuil(self.cuil)
        super().save(*args, **kwargs)



    

    
    
    



