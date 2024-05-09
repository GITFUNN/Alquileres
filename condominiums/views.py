from rest_framework.response import Response
from . serializers import CondominiumSerializer, GroupNoticesSerializer, ApartmentSerializer,JoiningRequestSerializer,GetJoiningRequestSerializer,GetApartmentNumberSerializer,GetCondominiumNameSerializer,SetRenterRequestSerializer,SetRequestStateSerializer,PrivNoticeSerializer,RentReceiptSerializer,CondominiumOwnerSerializer,FilesSerializer,PrivImagesSerializer
from . models import Condominium, GroupNotices, PrivNotices, Apartment, JoiningRequest, RentReceipt,Files, PrivImages
from rest_framework import status, generics
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from users.models import User
import datetime
from django.db.models import Q
from rest_framework.parsers import MultiPartParser
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
    except User.DoesNotExist:
        return Response({'error': 'El usuario destinatario no existe.'}, status=status.HTTP_400_BAD_REQUEST)

    if owner == request.user:
        if serializer.is_valid():
            serializer.save(sender=request.user, recipient = recipient_user, condominium=condominium, apartment=apartment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
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
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['PUT'])
def set_request_state(request,pk):
    joining_request = JoiningRequest.objects.get(pk = pk)
    serializer =SetRequestStateSerializer(joining_request, data = request.data)
    if serializer.is_valid():
        serializer.save()
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


@api_view(['GET'])
def get_priv_notices(request,pk):
    apartment = Apartment.objects.get(pk = pk)
    condominium = apartment.condominium
    renters = apartment.renters
    if request.user == condominium.owner or request.user == renters:
        priv_notices = PrivNotices.objects.filter(apartment_recipient = apartment)
        serializer = PrivNoticeSerializer(priv_notices, many = True)
        return Response(serializer.data)
    else: 
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['POST'])
def create_priv_notice(request,pk):
    apartment = Apartment.objects.get(pk=pk)
    user = request.user
    condominium = apartment.condominium
    serializer = PrivNoticeSerializer(data = request.data)
    if serializer.is_valid():
        if request.user == condominium.owner:
            serializer.save(owner_sender = user, apartment_recipient = apartment)

        else:
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)  
        return Response(serializer.data, status=status.HTTP_201_CREATED)   
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_priv_notice(request, pk):
    priv_notice = PrivNotices.objects.get(pk=pk)
    owner = priv_notice.owner_sender        
    if owner == request.user:
        priv_notice.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    else: 
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_priv_notice(request,pk):
    priv_notice = PrivNotices.objects.get(pk = pk)
    serializer = PrivNoticeSerializer(priv_notice, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_priv_notice(request,pk):
    priv_notices = PrivNotices.objects.get(pk = pk)
    serializer = PrivNoticeSerializer(priv_notices)
    return Response(serializer.data)



@api_view(['POST'])
def create_rent_receipt(request,pk):
    apartment = Apartment.objects.get(pk=pk)
    user = request.user
    condominium = apartment.condominium
    serializer = RentReceiptSerializer(data = request.data)
    if serializer.is_valid():
        if request.user == condominium.owner:
            serializer.save(owner = user, apartment_recipient = apartment)
            print(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)  
        return Response(serializer.data, status=status.HTTP_201_CREATED)   
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_rent_receipts(request,pk):
    apartment = Apartment.objects.get(pk = pk)
    condominium = apartment.condominium
    renters = apartment.renters
    if request.user == condominium.owner or request.user == renters:
        rent_receipt = RentReceipt.objects.filter(apartment_recipient = apartment)
        serializer = RentReceiptSerializer(rent_receipt, many = True)
        return Response(serializer.data)
    else: 
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['PUT'])
def edit_rent_receipt(request,pk):
    rent_receipt = RentReceipt.objects.get(pk = pk)
    serializer = RentReceipt(rent_receipt, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_rent_receipt(request,pk):
    rent_receipt = RentReceipt.objects.get(pk = pk)
    serializer = RentReceiptSerializer(rent_receipt)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_rent_receipt(request, pk):
    rent_receipt = RentReceipt.objects.get(pk=pk)
    owner = rent_receipt.owner     
    if owner == request.user:
        rent_receipt.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    else: 
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_condominium_owner(request,pk):
    condominium = Condominium.objects.get(pk = pk)
    owner = condominium.owner
    seralizer = CondominiumOwnerSerializer(owner)
    return Response(seralizer.data)

@api_view(['GET'])
def get_condominium_id(request):
    user = request.user
    apartment = Apartment.objects.filter(renters = user)
    condominium = Condominium.objects.filter(Q(owner = user) | Q(condominium = apartment.condominium))
    serializer = CondominiumSerializer(condominium)
    return Response(serializer.data)


@api_view(['POST'])
def create_private_file(request,pk):
    apartment = Apartment.objects.get(pk = pk)
    user = request.user
    condominium = apartment.condominium
    serializer = FilesSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        if request.user == condominium.owner:
            serializer.save(owner=user, apartment_recipient=apartment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
def get_private_files(request,pk):
    user = request.user
    apartment = Apartment.objects.get(pk=pk)    
    condominium = apartment.condominium
    files = Files.objects.filter(apartment_recipient = apartment)
    if (user == condominium.owner)or(user == apartment.renters):
        serializer = FilesSerializer(files, context={'request':request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)




@api_view(['POST'])
def create_private_image(request,pk):
    user=request.user
    apartment=Apartment.objects.get(pk = pk)
    condominium = apartment.condominium
    serializer = PrivImagesSerializer(data=request.data)
    if serializer.is_valid():
        if request.user == condominium.owner:
            serializer.save(owner=user, apartment_recipient=apartment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def get_private_images(request,pk):
    user = request.user
    apartment = Apartment.objects.get(pk=pk)    
    condominium = apartment.condominium
    images = PrivImages.objects.filter(apartment_recipient = apartment)
    if (user == condominium.owner)or(user == apartment.renters):
        serializer = FilesSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


