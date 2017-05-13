import os
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_406_NOT_ACCEPTABLE

from django.http import HttpResponse, JsonResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.utils.crypto import get_random_string
from django.conf import settings
from rest_framework.response import Response

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,

    )
IMAGE_DIRS = getattr(settings, "IMAGE_DIRS", None)


def get_image_path(filename):
    filepath = os.path.join(IMAGE_DIRS, filename)
    return filepath


class ImageUploadAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print('post')
        image_file = request.FILES['file']
        print(image_file)
        image_filename = get_random_string(length=32) + '.png'
        filepath = get_image_path(image_filename)

        if not os.path.exists(filepath):
            default_storage.save(filepath, ContentFile(image_file.read()))

        image_url = getattr(settings, "HOST_ADDRESS", None) + 'amoeba_chatting/api/image/' + image_filename + '/'
        return Response({'image_url': image_url}, status=HTTP_200_OK)


class ImageGetAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, filename):
        filepath = get_image_path(filename)
        try:
            with open(filepath, "rb") as f:
                return HttpResponse(f.read(), content_type="image/jpeg")
        except IOError:
            return HttpResponse(status=404)

