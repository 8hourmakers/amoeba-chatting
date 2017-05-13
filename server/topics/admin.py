from django.contrib import admin

# Register your models here.
from .models import TopicItem


class TopicItemModelAdmin(admin.ModelAdmin):
    list_display = ["name", "parent_id", "member_num", "background_image_url", "timestamp"]
    list_display_links = ["name"]
    list_filter = ["name", "parent_id"]

    search_fields = ["name"]

    class Meta:
        model = TopicItem

admin.site.register(TopicItem, TopicItemModelAdmin)