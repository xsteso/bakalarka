from rest_framework import serializers
from emails.models import Emails


class EmailSerializer(serializers.ModelSerializer):
    # defines format of datetime field
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Emails
        fields = ('id',
                  'enabled',
                  'subject',
                  'sender',
                  'reply_to',
                  'recipient',
                  'date',
                  'cc',
                  'body',
                  'type',
                  'sign',
                  'gameruns')

    def __init__(self, *args, **kwargs):
        super(EmailSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and (request.method == 'POST' or request.method == 'PUT'):
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1
