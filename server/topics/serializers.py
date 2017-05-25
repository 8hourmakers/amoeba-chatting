from .models import TopicItem
from favorites.models import FavoriteItem
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
    is_favorite = SerializerMethodField()

    class Meta:
        model = TopicItem
        fields = ('id', 'name', 'parent_id', 'member_num', 'subtopic_num', 'background_image_url', 'is_favorite')

    def get_subtopic_num(self, obj):
        subtopic_num = TopicItem.objects.filter(parent_id=obj.id).count()
        return subtopic_num

    def get_is_favorite(self, obj):
        user = self.context.get('request').user
        if FavoriteItem.objects.filter(topic=obj, user=user).exists():
            return True
        return False