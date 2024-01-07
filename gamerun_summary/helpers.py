from django.db.models import Q
from emails.models import Emails
from gameruns.models import GameRuns, EmailGameRuns


def check_answer_correctness(gamerun: GameRuns, email: Emails):
    """
        Gets player's answer of given **email** in given **gamerun**.

        :param gamerun: gamerun object
        :param email: email object
        :returns: player answer and correctness of this answer
    """
    egrun = EmailGameRuns.objects.filter(Q(email_id=email.id) & Q(game_run_id=gamerun.id) &
                                         ~Q(player_answer=None)).first()

    if egrun == None:
        return {'player_answer': None, 'correctness': None}

    correctness = False

    # if player's answer is False and type of email is legit, answer is correct
    if egrun.player_answer == False and (egrun.email.type.id == 1):
        correctness = True
    # if player's answer is True and type of email is phishing, answer is correct
    elif egrun.player_answer == True and (egrun.email.type.id != 1):
        correctness = True

    return {'player_answer': egrun.player_answer, 'correctness': correctness}
