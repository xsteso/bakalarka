from rest_framework import serializers
from gameruns.models import GameRuns, EmailGameRuns


class GameRunSerializer(serializers.ModelSerializer):
    start_time = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    end_time = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = GameRuns
        fields = ('id',
                  'player_name',
                  'player_age',
                  'player_gender',
                  'emails',
                  'start_time',
                  'end_time'
                  )

    def __init__(self, *args, **kwargs):
        super(GameRunSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and (request.method == 'POST' or request.method == 'PUT'):
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1


class EmailGameRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailGameRuns
        fields = ('id',
                  'email',
                  'game_run',
                  'order',
                  'player_answer',
                  'duration'
                  )
