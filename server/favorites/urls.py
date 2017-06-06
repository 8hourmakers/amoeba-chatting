from django.conf.urls import url
from .views import FavoriteListCreateAPIView, FavoriteDestroyAPIView

urlpatterns = [
    url(r'^$', FavoriteListCreateAPIView.as_view(), name='favorite_list'),
    url(r'^(?P<topic_id>.+)/$', FavoriteDestroyAPIView.as_view(), name='favorite_delete'),
]
