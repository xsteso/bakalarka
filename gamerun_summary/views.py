from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from email_statistics_calculator.views import count_average_correctness, count_average_duration
from emails.models import Emails
from rest_framework import status
from emails.serializers import EmailSerializer
from gamerun_summary.helpers import check_answer_correctness
from gameruns.models import EmailGameRuns, GameRuns
from gameruns.serializers import GameRunSerializer


@api_view(('GET',))
def get_gamerun_summary(request, gamerun_id):
    """
        Calculates summary for every email in current gamerun:
         * average answer correctness
         * average answer durations
         * player's answer duration

        :param request: http request
        :returns: array of emails and theirs statistics
    """

    gamerun = GameRuns.objects.filter(id__exact=gamerun_id).first()

    if not gamerun:
        return Response("Not found", status=status.HTTP_404_NOT_FOUND)

    emails = gamerun.emails
    statistics = []

    for email in emails.iterator():
        average_correctness = count_average_correctness(email)
        average_duration = count_average_duration(email)
        players_duration = get_players_answer_duration(gamerun, email)
        answer = check_answer_correctness(gamerun, email)

        statistics.append({'email': EmailSerializer(email).data, 'average_correctness': average_correctness,
                           'average_duration': average_duration, 'players_duration': players_duration,
                           'answer': answer
                           })

    return Response({'gamerun': GameRunSerializer(gamerun).data, 'statistics': statistics})


@api_view(('GET',))
def get_gameruns_with_statistics(request):
    """
        Calculates summary for every email in current gamerun:
         * average answer correctness
         * average answer durations
         * player's answer duration

        :param request: http request
        :returns: array of emails and theirs statistics
    """
    gameruns = GameRuns.objects.all()
    gameruns_with_statistics = []

    for gamerun in gameruns.iterator():

        gameruns_with_statistics.append(
            {**GameRunSerializer(gamerun).data, 'statistics': get_gamerun_statistics(gamerun)})

    return Response(gameruns_with_statistics)


@api_view(('GET',))
def get_gamerun_with_statistics_by_email(request, email_id):
    """"
        Calculates summary for every email in current gamerun:
         * average answer correctness
         * average answer durations
         * player's answer duration

        :param request: http request
        :returns: array of emails and theirs statistics
    """
    egruns = EmailGameRuns.objects.filter(
        Q(email_id=email_id)).select_related('game_run')

    gameruns = []

    for egrun in egruns:
        gameruns.append(egrun.game_run)

    gameruns_with_statistics = []

    for gamerun in gameruns:

        gameruns_with_statistics.append(
            {**GameRunSerializer(gamerun).data, 'statistics': get_gamerun_statistics(gamerun)})

    return Response(gameruns_with_statistics)


@api_view(('GET',))
def get_gamerun_with_statistics_by_id(request, gamerun_id):
    """
        Calculates summary for every email in current gamerun:
         * average answer correctness
         * average answer durations
         * player's answer duration

        :param request: http request
        :returns: array of emails and theirs statistics
    """
    gamerun = GameRuns.objects.filter(id__exact=gamerun_id).first()
    response = {**GameRunSerializer(gamerun).data,
                'statistics': get_gamerun_statistics(gamerun)}

    return Response(response)


def get_players_answer_duration(gamerun: GameRuns, email: Emails):
    """
        Gets **answer duration** of the given email in the gamerun

        :param gamerun: gamerun object
        :param email: email object
        :returns: player's answer duration for given email
    """

    try:
        egrun = EmailGameRuns.objects.get(
            Q(email_id=email.id) & Q(game_run_id=gamerun.id) & ~Q(player_answer=None))
    except EmailGameRuns.DoesNotExist:
        egrun = None

    if not egrun:
        return None

    return str(egrun.duration).split('.')[0]


def get_gamerun_statistics(gamerun: GameRuns):
    statistics = []

    for email in gamerun.emails.iterator():
        statistics.append({**check_answer_correctness(gamerun, email),
                          'players_duration': get_players_answer_duration(gamerun, email)})

    return statistics
