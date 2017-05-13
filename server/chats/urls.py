from django.conf.urls import url
from django.contrib import admin

from .views import index, ChatTiemListAPIView

urlpatterns = [
    url(r'^$', index),
    url(r'^(?P<topic_id>.+)', ChatTiemListAPIView.as_view()),
]