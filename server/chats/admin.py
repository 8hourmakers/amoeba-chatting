from django.contrib import admin

# Register your models here.
from .models import ChatItem


class ChatItemModelAdmin(admin.ModelAdmin):
    list_display = ["topic", "user", "content", "timestamp"]
    list_display_links = ["content"]
    list_filter = ["topic", "user"]

    search_fields = ["topic", "user"]

    class Meta:
        model = ChatItem

admin.site.register(ChatItem, ChatItemModelAdmin)