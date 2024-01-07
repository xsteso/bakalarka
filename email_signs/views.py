from rest_framework import viewsets
from email_signs.models import Signs
from email_signs.serializers import SignSerializer


class SignViewSet(viewsets.ModelViewSet):
    queryset = Signs.objects.all()
    serializer_class = SignSerializer
