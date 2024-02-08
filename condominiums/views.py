from rest_framework.response import Response
from . serializers import CondominiumSerializer, GroupNoticesSerializer, ApartmentSerializer,JoiningRequestSerializer,GetJoiningRequestSerializer,GetApartmentNumberSerializer,GetCondominiumNameSerializer,SetRenterRequestSerializer,SetRequestStateSerializer
from . models import Condominium, GroupNotices,  PrivNotices, Apartment, JoiningRequest
from rest_framework import status, generics
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from users.models import User
import datetime
@api_view(['GET'])
def get_condominiums(request):
    user = request.user
    condominiums = Condominium.objects.filter(owner=user)
    serializer = CondominiumSerializer(condominiums, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def get_condominiumid(request,pk):
    condominiums = Condominium.objects.get(pk=pk)
    serializer = CondominiumSerializer(condominiums)
    return Response(serializer.data)
   
@api_view(['POST'])
def create_condominium(request):
    serializer = CondominiumSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save(owner = request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)   
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  


  
@api_view(['PUT'])
def edit_condominium(request,pk):
    condominium = Condominium.objects.get(pk = pk)
    if request.user == condominium.owner:
        serializer = CondominiumSerializer(condominium, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['DELETE'])
def delete_condominium(request, pk):
        condominium = Condominium.objects.get(pk = pk)
        if request.user == condominium.owner:
            condominium.delete()
            return Response(status = status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
@api_view(['GET'])
def get_apartments(request,pk):
    condominium = Condominium.objects.get(pk = pk)
    if request.user == condominium.owner:
        apartments = Apartment.objects.filter(condominium = condominium)
        serializer = ApartmentSerializer(apartments, many = True)
        print(serializer.data)
        return Response(serializer.data)
    else: 
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_apartment(request,pk):
    apartment = Apartment.objects.get(pk = pk)
    serializer = ApartmentSerializer(apartment)
    return Response(serializer.data)
                   
@api_view(['POST'])
def create_apartment(request,pk):
    request.data['renters'] = request.data.get('renters', None)
    serializer = ApartmentSerializer(data = request.data)
    condominium = Condominium.objects.get(pk = pk)
    if serializer.is_valid():
        serializer.save(condominium = condominium)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_apartment(request, pk):
        if request.user != None:
            apartment = Apartment.objects.filter(pk = pk)
            apartment.delete()
            return Response(status = status.HTTP_204_NO_CONTENT)
        else: print("ERROR")

@api_view(['PUT'])
def edit_apartment(request,pk):
    apartment = Apartment.objects.get(pk = pk)
    serializer = ApartmentSerializer(apartment, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def joining_request(request, pk):
    serializer = JoiningRequestSerializer(data=request.data)
    apartment = Apartment.objects.get(pk=pk)
    condominium = apartment.condominium
    owner = condominium.owner
    # Verificar si el usuario existe antes de continuar
    recipient_info = request.data.get('recipient')
    print("recipient info: ", recipient_info) 
    try:
        recipient_user = User.objects.get(pk=recipient_info)
        print(recipient_user)
    except User.DoesNotExist:
        return Response({'error': 'El usuario destinatario no existe.'}, status=status.HTTP_400_BAD_REQUEST)

    if owner == request.user:
        if serializer.is_valid():
            serializer.save(sender=request.user, recipient = recipient_user, condominium=condominium, apartment=apartment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['GET'])
def getRequests(request):
    joining_requests = JoiningRequest.objects.filter(recipient = request.user)
    try:
        serializer = GetJoiningRequestSerializer(joining_requests, many = True)   
        return Response(serializer.data, status = status.HTTP_200_OK)
    except:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getApartmentNumber(request,pk):
    apartment = Apartment.objects.get(pk = pk)
    serializer = GetApartmentNumberSerializer(apartment)
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
def getCondominiumName(request,pk):
    condominium = Condominium.objects.get(pk = pk)
    serializer = GetCondominiumNameSerializer(condominium)
    return Response(serializer.data, status = status.HTTP_200_OK)


@api_view(['PUT'])
def set_renter(request,pk,id):
    apartment = Apartment.objects.get(pk = pk)
    serializer = SetRenterRequestSerializer(apartment, data = request.data)
    user = User.objects.get(pk = id)
    if serializer.is_valid():
        serializer.save(renters = user)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['PUT'])
def set_request_state(request,pk):
    joining_request = JoiningRequest.objects.get(pk = pk)
    serializer =SetRequestStateSerializer(joining_request, data = request.data)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


@api_view(['DELETE'])
def delete_request(request, pk):
        if request.user != None:
            joining_request = JoiningRequest.objects.filter(pk = pk)
            joining_request.delete()
            return Response(status = status.HTTP_204_NO_CONTENT)
        else: print("ERROR")