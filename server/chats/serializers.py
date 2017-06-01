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
    topic_id = SerializerMethodField()
    user = UserSerializer()
    timestamp = SerializerMethodField()

    class Meta:
        model = ChatItem
        fields = ['id', 'user', 'topic_id', 'content', 'timestamp']

    def get_timestamp(self, obj):
        return obj.timestamp.strftime("%Y-%m-%d %H:%M:%S.%f")

    def get_topic_id(self, obj):
        return obj.topic.id
