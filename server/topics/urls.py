from django.conf.urls import url
from .views import TopicListCreateAPIView, TopicSearchListAPIView, TopicRetrieveAPIView

urlpatterns = [
    url(r'^$', TopicListCreateAPIView.as_view(), name='topic_list'),
    url(r'^(?P<id>[0-9]+)$', TopicRetrieveAPIView.as_view(), name='topic_detail'),
    url(r'^search', TopicSearchListAPIView.as_view(), name='topic_search_list'),
]
