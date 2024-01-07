import random
from typing import List

from emails.models import Emails


def generateEmails(emails: list[Emails], number: int) -> list[Emails]:
    random_emails = random.sample(
        emails, number)
    return random_emails
