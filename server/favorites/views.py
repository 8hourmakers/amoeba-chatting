
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

class FavoriteListCreateAPIView(ListCreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = FavoriteListCreateSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = FavoriteItem.objects.filter(user=self.request.user).all()
        return queryset_list

    def post(self, request, *args, **kwargs):
        data = request.data
        topic = get_object_or_404(TopicItem.objects.filter(id=data['topic_id']))
        if FavoriteItem.objects.filter(topic=topic, user=request.user).exists():
            return Response("Already favorite topic", status=status.HTTP_409_CONFLICT)

        favorite_item = FavoriteItem(
            user=request.user,
            topic=topic
        )
        favorite_item.save()
        serializer = FavoriteListCreateSerializer(favorite_item)
        return Response(serializer.data)


class FavoriteDestroyAPIView(DestroyAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = FavoriteItem

    def delete(self, request, favorite_id, *args, **kwargs):
        FavoriteItem.objects.filter(id=favorite_id).delete()
        return Response(status=status.HTTP_200_OK)

