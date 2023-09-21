from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class RegisterUserSerializer(serializers.ModelSerializer):
    class Mete:
        model = User
        fields = ['email', 'password', 'name', 'last_name', 'phone_number', 'cuil']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
    
        token['email'] = user.email
        token['phone_number'] = user.phone_number
        token['cuil'] = user.cuil
        token['is_staff'] = user.is_staff
        
        return token
        