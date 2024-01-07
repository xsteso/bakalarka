from rest_framework import serializers
from email_types.models import Types


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Types
        fields = ('id',
                  'type'
                  )
