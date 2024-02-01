from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from condominiums.models import JoiningRequest
class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'last_name', 'phone_number']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['phone_number'] = user.phone_number       
        return token

class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','id']

class GetSenderRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']             


