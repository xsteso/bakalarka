from datetime import datetime, timezone
from django.utils.dateparse import parse_datetime
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from emails.serializers import EmailSerializer
from emails.models import Emails
from gameruns.models import GameRuns, EmailGameRuns
from settings.models import Settings
from gamerun_manager.helpers import set_random_emails


@api_view(('POST',))
def init_gamerun(request):
    """
    Creates gamerun object with given username and calls
    set_random_emails to assign emails to gamerun

    :param request: http request
    :returns: HTTP_201 if successful
    """
    username = request.data['username']
    age = request.data['age']
    gender = request.data['gender']



    gamerun = GameRuns.objects.create(
        player_name=username, player_age=age, player_gender=gender)

    request.session['gamerun'] = gamerun.id
    request.session['order'] = 0
    request.session['current_email'] = -1
    request.session['answered'] = False
    request.session['remaining'] = int(Settings.objects.get(
        key__exact="number_of_emails"
    ).value)


    request.session.modified = True

    set_random_emails(gamerun.id)
    return Response("Successful", status=status.HTTP_201_CREATED)


@api_view(('POST',))
def set_player_answer(request):
    """
        Function sets player_answer and answer duration
        of current email in player's gamerun saved in session.

        :param request: http request
        :returns: HTTP_201 if successful
    """
    gamerun_id = request.session['gamerun']
    email_id = request.session['current_email']
    egrun = EmailGameRuns.objects.get(
        email__exact=email_id, game_run=gamerun_id)
    egrun.player_answer = request.data['answer']

    # calculate duration by subtracting datetime in session and actual datetime
    duration = datetime.now(timezone.utc) - \
        parse_datetime(request.session['email_start_time'])
    egrun.duration = duration

    # decrement number of remaining emails in gamerun
    request.session['remaining'] -= 1
    egrun.save()

    request.session['answered'] = True

    return Response("Successful", status=status.HTTP_201_CREATED)


@api_view(('GET',))
def next_email(request):
    """
    Gets gamerun from session and returns first email, which
    hasn't been answered by the player yet.

    :param request: http request
    :returns: unanswered email from current gamerun
    """
    gamerun_id = request.session['gamerun']  # get gamerun id from session
    gamerun = GameRuns.objects.filter(
        id__exact=gamerun_id).first()  # find player's gamerun
    remaining = request.session['remaining']

    # player has answered all emails
    if remaining <= 0:  # Checking if player answered all emails
        # set end time of gamerun to current datetime
        gamerun.end_time = datetime.now(tz=timezone.utc)
        gamerun.save()
        return Response({"end": True, 'gamerun_id': gamerun_id})

    # if current email is not answered and is not first email of gamerun, return same email
    if not request.session['answered'] and request.session['current_email'] != -1:
        email_id = request.session['current_email']
        email = Emails.objects.filter(id__exact=email_id).first()

        return Response({**EmailSerializer(email).data, 'gameruns': None, 'gamerun_id': gamerun_id, 'step': gamerun.emails.count() - remaining})

    # Get first unanswered email
    email = gamerun.emails.filter(
        emailgameruns__player_answer__isnull=True).first()

    request.session['current_email'] = email.id
    request.session['answered'] = False
    request.session['email_start_time'] = datetime.now(timezone.utc).__str__()
    request.session.modified = True

    return Response({**EmailSerializer(email).data, 'gameruns': None, 'gamerun_id': gamerun_id, 'step': gamerun.emails.count() - remaining})
