
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from . models import User
from .serializers import RegisterUserSerializer, MyTokenObtainPairSerializer,GetUserSerializer,GetSenderRequestSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status

"""class Register(APIView):
    def post (self, request):
        data  = request.data
        user = User.objects.create(
            email = data['email'],
            name = data['name'],
            last_name = data['last_name'],
            phone_number = data['phone_number'],
            password = make_password(data ['password'])
            
        )
        serializer = RegisterUserSerializer(user, many = False) 
        return Response(serializer.data)
         

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer"""

@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create(
            email = data['email'],
            name = data['name'],
            last_name = data['last_name'],
            phone_number = data['phone_number'],
            password = make_password(data['password'])
            )
    serializer = RegisterUserSerializer(user, many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
@api_view(['GET'])
def get_user(request, email):
    try:
        user = User.objects.get(email=email)
        serializer = GetUserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    
@api_view(['GET'])
def getSenderEmail(request,pk):
    if pk is not None:
        sender = User.objects.get(pk = pk)
        serializer = GetSenderRequestSerializer(sender)
        print(serializer.data)
        return Response(serializer.data, status = status.HTTP_200_OK)


