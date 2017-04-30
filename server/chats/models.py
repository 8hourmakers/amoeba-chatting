from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


class ChatItem(models.Model):
    topic = models.ForeignKey('topics.TopicItem')
    user = models.ForeignKey(get_user_model())
    content = models.CharField(max_length=500, blank=True)
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)