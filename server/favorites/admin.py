from django.contrib import admin

# Register your models here.
from .models import FavoriteItem


class FavoriteItemModelAdmin(admin.ModelAdmin):
    list_display = ["topic", "user", "timestamp"]
    list_display_links = ["topic"]
    list_filter = ["topic", "user"]

    search_fields = ["topic", "user"]

    class Meta:
        model = FavoriteItem

admin.site.register(FavoriteItem, FavoriteItemModelAdmin)