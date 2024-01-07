from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from email_statistics_calculator.views import add_statistics_to_email
from emails.serializers import EmailSerializer
from gameruns.models import GameRuns, EmailGameRuns
from gameruns.serializers import GameRunSerializer, EmailGameRunSerializer


@api_view(('GET',))
def emails_from_gamerun(request, gamerun_id):
    """
    Sends response with emails of gamerun with given gamerun_id

    :param request: http request
    :param gamerun_id: ID of gamerun
    :returns: emails if gamerun exists, otherwise HTTP 404
    """
    gamerun = GameRuns.objects.filter(id__exact=gamerun_id).first()

    # if gamerun with given id doesn't exist
    if gamerun is None:
        return Response("Gamerun doesn't exist.", status=status.HTTP_404_NOT_FOUND)

    gamerun_emails = []

    for email in gamerun.emails.iterator():
        gamerun_emails.append(add_statistics_to_email(email))

    return Response(gamerun_emails)

class GameRunViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'delete']
    queryset = GameRuns.objects.all()
    serializer_class = GameRunSerializer


class EmailGameRunViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'delete']
    queryset = EmailGameRuns.objects.all()
    serializer_class = EmailGameRunSerializer
