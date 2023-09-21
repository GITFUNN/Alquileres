
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from . models import User
from .serializers import RegisterUserSerializer, MyTokenObtainPairSerializer
from rest_framework.views import APIView

class Register(APIView):
    def post (self, request):
        data  = request.data
        user = User.objects.create(
            email = data['email'],
            name = data['name'],
            last_name = data['last_name'],
            phone_number = data['phone_number'],
            cuil = data['cuil'],
            password = make_password(data ['password'])
            
        )
        serializer = RegisterUserSerializer(user, many = False) 
        return Response(serializer.data)
         

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
