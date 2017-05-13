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

    subtopic_num = SerializerMethodField()

    class Meta:
        model = TopicItem
        fields = ('id', 'name', 'parent_id', 'member_num', 'subtopic_num', 'background_image_url')

    def get_subtopic_num(self, obj):
        subtopic_num = TopicItem.objects.filter(parent_id=obj.id).count()
        return subtopic_num