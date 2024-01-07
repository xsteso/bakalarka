from rest_framework import viewsets
from email_types.models import Types
from email_types.serializers import TypeSerializer


class TypeViewSet(viewsets.ModelViewSet):
    queryset = Types.objects.all()
    serializer_class = TypeSerializer