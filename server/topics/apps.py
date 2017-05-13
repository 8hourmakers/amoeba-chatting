from django.apps import AppConfig

class TopicsConfig(AppConfig):
    name = 'topics'
    verbose_name = "Amoeba Chatting"

    def ready(self):
        from topics.models import TopicItem
        if not TopicItem.objects.filter(id=1).exists():
            topic_item = TopicItem.objects.create(name='ROOT')
            topic_item.save()
