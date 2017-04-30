from __future__ import unicode_literals

from django.db import models


class TopicItem(models.Model):
    name = models.CharField(max_length=30, null=False)
    parent_id = models.IntegerField(null=True)
    member_num = models.IntegerField(default=0)
    timestamp = models.DateTimeField(null=True)

    def __str__(self):
        return self.name
