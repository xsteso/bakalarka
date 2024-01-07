from rest_framework import serializers
from email_signs.models import Signs


class SignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signs
        fields = ('id',
                  'text'
                  )
