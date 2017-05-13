from rest_framework import pagination
from .models import ChatItem
from rest_framework.serializers import (
    CharField,
    EmailField,
    DateField,
    DateTimeField,
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

class ChatItemSerializer(ModelSerializer):
    topic = TopicSerializer()
    user = UserSerializer()
    timestamp = SerializerMethodField()

    class Meta:
        model = ChatItem
        fields = ['id', 'user', 'topic', 'content', 'timestamp']

    def get_timestamp(self, obj):
        return obj.timestamp.strftime("%Y-%m-%d %H:%M:%S")
