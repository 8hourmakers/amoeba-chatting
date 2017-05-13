from django.shortcuts import render, get_object_or_404

from rest_framework.generics import (
    ListCreateAPIView, ListAPIView, DestroyAPIView
    )
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.response import Response
from .models import ChatItem
from rest_framework.decorators import api_view
from django.core.paginator import Paginator
from .serializers import ChatItemSerializer

def index(request):
    return render(request, 'chats/index.html')



class ChatItemListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatItemSerializer

    def get_queryset(self, *args, **kwargs):
        topic_id = self.kwargs['topic_id']
        from_id = self.request.GET.get('from_id')
        queryset_list = ChatItem.objects.filter(topic__id=topic_id).order_by("-timestamp")
        if from_id:
            queryset_list = queryset_list.filter(id__lt=from_id)
        return queryset_list[:20]

