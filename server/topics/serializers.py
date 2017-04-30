from .models import TopicItem
from rest_framework.serializers import (
    CharField,
    EmailField,
    DateField,
    IntegerField,
    BooleanField,
    HyperlinkedIdentityField,
    ModelSerializer,
    Serializer,
    SerializerMethodField,
    ValidationError
    )
import logging


class TopicSerializer(ModelSerializer):

    class Meta:
        model = TopicItem
        fields = ('id', 'name', 'parent_id', 'member_num')

