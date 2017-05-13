from django.conf.urls import url
from .views import ImageUploadAPIView, ImageGetAPIView

urlpatterns = [
    url(r'^$', ImageUploadAPIView.as_view(), name='upload_image'),
    url(r'^(?P<filename>.+)/$', ImageGetAPIView.as_view(), name='get_image'),
]
