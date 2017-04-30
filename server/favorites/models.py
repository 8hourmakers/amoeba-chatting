from __future__ import unicode_literals

from django.db import models
from django.contrib.auth import get_user_model

class FavoriteItem(models.Model):
    topic = models.ForeignKey('topics.TopicItem')
    user = models.ForeignKey(get_user_model())
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.topic.name
