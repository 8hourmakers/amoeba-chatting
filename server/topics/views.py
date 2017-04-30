
from rest_framework.generics import (
    ListCreateAPIView, ListAPIView, RetrieveAPIView
    )
from rest_framework.permissions import (
    IsAuthenticated,
)
from .models import TopicItem
from .serializers import TopicSerializer
from rest_framework.response import Response
from rest_framework import status

class TopicListCreateAPIView(ListCreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = TopicSerializer

    def get_queryset(self, *args, **kwargs):
        parent_id = self.request.GET.get('parent_id', None)
        if parent_id is not None:
            queryset_list = TopicItem.objects.filter(parent_id=parent_id).all()
        else:
            queryset_list = TopicItem.objects.filter(parent_id=None).all()
        return queryset_list


class TopicSearchListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TopicSerializer

    def get_queryset(self, *args, **kwargs):
        search_query = self.request.GET.get('query', '')
        queryset_list = TopicItem.objects.filter(name__contains=search_query).all()
        return queryset_list



class TopicRetrieveAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TopicSerializer
    lookup_field = 'id'
    queryset = TopicItem.objects.all()