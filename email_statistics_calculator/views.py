from rest_framework.decorators import api_view
from rest_framework.response import Response
from email_statistics_calculator.calculators import get_email_occurrence_number, count_average_correctness, \
    count_average_duration
from emails.models import Emails
from emails.serializers import EmailSerializer


@api_view(('GET',))
def get_emails_with_statistics(request):
    """
        Calculates statistics for every email:
         * email occurrence
         * average_duration
         * average_correctness

        :param request: http request
        :returns: array of emails and theirs statistics
    """
    emails = Emails.objects.all()
    emails_with_statistics = []

    for email in emails.iterator():
        emails_with_statistics.append(add_statistics_to_email(email))

    return Response(emails_with_statistics)


@api_view(('GET',))
def get_email_with_statistics_by_id(request, email_id):
    """
        Function returns email statistics:

        * occurrence number in gameruns
        * average answer duration
        * average answer correctness

        :param request: http request
        :param email_id: id of email
        :returns: statistics for given email
    """
    email = Emails.objects.get(id=email_id)
    return Response(add_statistics_to_email(email))


def add_statistics_to_email(email):
    occurrence = get_email_occurrence_number(email)
    average_duration = count_average_duration(email)
    average_correctness = count_average_correctness(email)

    return {**EmailSerializer(email).data, "occurrence": occurrence, "average_duration": average_duration,
            "average_correctness": average_correctness}
