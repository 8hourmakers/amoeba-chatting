from django.conf.urls import url
from django.contrib import admin

from .views import index, ChatTiemListAPIView

urlpatterns = [
    url(r'^$', index),
    url(r'^(?P<topic_id>[0-9]+)$', ChatTiemListAPIView.as_view()),
]