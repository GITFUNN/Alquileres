from rest_framework import serializers
from .models import (
    Condominium,
    GroupNotices,
    PrivNotices,
    Apartment,
    JoiningRequest,
    RentReceipt,
    Files,
    PrivImages,
)


class GroupNoticesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupNotices
        fields = "__all__"


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ["rooms_number", "number", "id", "renters"]


class CondominiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condominium
        fields = ["condominium_name", "condominium_location", "id"]

    def get_group_notices(self, obj):
        group_notices = obj.groupnotices_set.all()
        serializer = GroupNoticesSerializer(group_notices, many=True)
        return serializer.data


class CondominiumOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condominium
        fields = ["owner"]


class JoiningRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = JoiningRequest
        fields = ["recipient", "active", "rejected"]


class GetJoiningRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoiningRequest
        fields = "__all__"


class GetApartmentNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ["number"]


class GetCondominiumNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Condominium
        fields = ["condominium_name"]


class SetRenterRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ["renters"]


class SetRequestStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoiningRequest
        fields = ["active", "rejected"]


class PrivNoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivNotices
        fields = "__all__"


class RentReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentReceipt
        fields = "__all__"


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = "__all__"


class PrivImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivImages
        fields = "__all__"
