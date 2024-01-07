from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from email_parser.parser import parser
from emails.models import Emails
from emails.serializers import EmailSerializer


class EmailViewSet(viewsets.ModelViewSet):
    queryset = Emails.objects.all()
    serializer_class = EmailSerializer


@api_view(('POST',))
def parse(request):
    """
    Function parses given text into email and email parts.

    :param request: http request containing data
    :returns: HTTP_400 if text couldn't be parsed, otherwise HTTP_201
    """
    text = request.data["text"]  # get text from received data
    parsed_email_parts = parser(text)
    serializer = EmailSerializer(data=parsed_email_parts)

    if not serializer.is_valid():  # if parsed email is invalid
        return Response("Couldn't parse the email", status=status.HTTP_400_BAD_REQUEST)

    email = Emails.objects.create(
        **parsed_email_parts, type_id=request.data["type"])
    # set type of email according to sign id located in request data
    email.sign.set(request.data["sign"])

    return Response("Created", status=status.HTTP_201_CREATED)


@api_view(('PUT',))
def update_enabled(request, email_id):
    """
    Function updated enabled field of email.

    :param request: http request containing data
    :returns: HTTP_400 if email cant be updated, otherwise HTTP_200
    """

    email = Emails.objects.get(id=email_id)
    enabled = request.data["enabled"]  # get text from received data

    email.enabled = enabled
    email.save()

    return Response("Updated", status=status.HTTP_200_OK)
