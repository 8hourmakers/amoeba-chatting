from .models import FavoriteItem
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
from topics.serializers import TopicSerializer
from users.serializers import UserSerializer

class FavoriteListCreateSerializer(ModelSerializer):
    topic = TopicSerializer()
    user = UserSerializer()

    class Meta:
        model = FavoriteItem
        fields = ['id', 'user', 'topic']
