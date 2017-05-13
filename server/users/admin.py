from django.contrib import admin

# Register your models here.
from .models import User


class UserModelAdmin(admin.ModelAdmin):
    list_display = ["email", "username", "profile_image_url"]
    list_display_links = ["email"]
    list_filter = ["email", "username"]

    search_fields = ["email", "username"]

    class Meta:
        model = User

admin.site.register(User, UserModelAdmin)