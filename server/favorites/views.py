
from rest_framework.generics import (
    ListCreateAPIView, ListAPIView, DestroyAPIView
    )
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.response import Response
from .models import FavoriteItem
from .serializers import FavoriteListCreateSerializer
from topics.models import TopicItem
from topics.serializers import TopicSerializer

class FavoriteListCreateAPIView(ListCreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = TopicSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self, *args, **kwargs):
        favorite_list = FavoriteItem.objects.filter(user=self.request.user).all()
        topic_list = [ favorite.topic for favorite in favorite_list]
        return topic_list

    def post(self, request, *args, **kwargs):
        data = request.data
        topic = get_object_or_404(TopicItem.objects.filter(id=data['topic_id']))
        if FavoriteItem.objects.filter(topic=topic, user=request.user).exists():
            return Response(data={"message": "Already favorite topic"}, status=status.HTTP_409_CONFLICT)

        favorite_item = FavoriteItem(
            user=request.user,
            topic=topic
        )
        favorite_item.save()
        serializer = TopicSerializer(favorite_item.topic, context={'request': request})
        return Response(serializer.data)


class FavoriteDestroyAPIView(DestroyAPIView):

    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    def delete(self, request, topic_id, *args, **kwargs):
        if not FavoriteItem.objects.filter(topic__id=topic_id, user=self.request.user).exists():
            return Response(data={'message': 'favorite not exists'}, status=status.HTTP_404_NOT_FOUND)
        FavoriteItem.objects.filter(topic__id=topic_id, user=self.request.user).delete()
        return Response(data={'results': 'Successfully Deleted'}, status=status.HTTP_200_OK)

