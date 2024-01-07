from django.db.models import Q, Avg, Case, When, FloatField, F
from emails.models import Emails
from gameruns.models import EmailGameRuns


def get_email_occurrence_number(email: Emails):
    """
        Function returns **occurrence number** of the given email. Occurrence number
        is calculated only on gameruns, where this email has been answered.

        :param email: email used for calculating
        :returns: Occurence number
    """
    occurrence = EmailGameRuns.objects.filter(
        Q(email_id=email.id) & ~Q(player_answer=None)).count()

    return occurrence


def count_average_correctness(email: Emails):
    """
        Function calculates **average answer correctness** of the
        given email. Unanswered emails are not included in statistic.

        :param email: email used for calculating
        :returns: Average rounded correctness
    """
    egruns = EmailGameRuns.objects.filter(
        Q(email_id=email.id) & ~Q(player_answer=None))

    average_correctness = egruns.aggregate(average_correctness=Avg(Case(
        When((Q(player_answer=True) & ~Q(email__type__id=1))
             | (Q(player_answer=False) & Q(email__type__id=1)), then=100.0), default=0.0),
        output_field=FloatField())).get('average_correctness')

    if average_correctness is not None:
        return round(average_correctness)
    return None


def count_average_duration(email: Emails):
    """
        Function calculates **average answer duration** of the
        given email. Unanswered emails are not included in statistic.

        :param email: email used for calculating
        :returns: average answer duration
    """
    egruns = EmailGameRuns.objects.filter(
        Q(email_id=email.id) & ~Q(player_answer=None))
    average_duration = egruns.aggregate(
        average_duration=Avg(F('duration'))).get('average_duration')

    if average_duration is not None:
        return str(average_duration).split('.')[0]
    return None
