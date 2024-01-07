from functools import cmp_to_key
from random import shuffle
from email_statistics_calculator.calculators import count_average_correctness

from emails.models import Emails


def compare(email1: Emails, email2: Emails):
    correctness1 = count_average_correctness(email1)
    correctness2 = count_average_correctness(email2)

    # handling if some of the values is None
    if correctness1 == None and correctness2 == None:
        return 0
    elif correctness1 == None and correctness2 != None:
        return -1
    elif correctness1 != None and correctness2 == None:
        return 1

    # actual comparing if both values are present
    if correctness1 < correctness2:
        return -1
    elif correctness1 > correctness2:
        return 1
    else:
        return 0


def generateEmailsEasy(emails: list[Emails], number: int) -> list[Emails]:
    return generate(emails, number, 'easy')


def generateEmailsHard(emails: list[Emails], number: int) -> list[Emails]:
    return generate(emails, number, 'hard')


def generate(emails: list[Emails], number: int, difficulty: str) -> list[Emails]:

    random_emails = emails
    random_emails.sort(key=cmp_to_key(compare),
                       reverse=True if difficulty == 'easy' else False)
    random_emails = random_emails[0:number]
    shuffle(random_emails)

    return random_emails
