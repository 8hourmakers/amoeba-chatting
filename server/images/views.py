import os
import base64
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

    )
IMAGE_DIRS = getattr(settings, "IMAGE_DIRS", None)


def get_image_path(filename):
    filepath = os.path.join(IMAGE_DIRS, filename)
    return filepath


class ImageUploadAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print('post')
        image_file_str = request.data['file']
        image_file_str_particle = image_file_str.split('base64,')
        if len(image_file_str_particle) != 2:
            return Response(status=HTTP_406_NOT_ACCEPTABLE)
        image_file_str = image_file_str_particle[1]

        image_filename = get_random_string(length=32) + '.png'
        filepath = get_image_path(image_filename)

        if not os.path.exists(filepath):
            with open(filepath, "wb") as fh:
                fh.write(base64.decodebytes(image_file_str.encode()))

            # default_storage.save(filepath, ContentFile(image_file.read()))

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

