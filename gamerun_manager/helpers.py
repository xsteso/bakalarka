import random
from emails.models import Emails
from gamerun_manager.generators.default import generateEmails as DEFAULT_GENERATOR
from gamerun_manager.generators.correctness import generateEmailsEasy as GENERATOR_CORRECTNESS_EASY
from gamerun_manager.generators.correctness import generateEmailsHard as GENERATOR_CORRECTNESS_HARD
from gameruns.models import GameRuns, EmailGameRuns
from settings.models import Settings
import os


def set_random_emails(gamerun_id: int):
    """
    Gets random legitimate and phishing emails
    and sets them to the given gamerun, without repetition
    with respect to enabled field set in emails

    :param gamerun_id: ID of gamerun
    :returns: None
    """

    # from settings get how many emails should be in gamerun
    number_of_emails = int(Settings.objects.get(
        key__exact="number_of_emails").value)
    # from settings get ratio of phishing emails in gamerun
    perc_of_phishing = int(Settings.objects.get(
        key__exact="phishing_emails").value)
    # calculate number of phishing emails in gamerun
    number_of_phishing_emails = int(
        round(
            number_of_emails * (perc_of_phishing / 100), 0
        ))
    number_of_legit_emails = number_of_emails - number_of_phishing_emails

    # email with type id 1 is legitimate, type id > 1 means phishing
    phishing_emails = list(Emails.objects.filter(
        type__id__gt=1))  # phishing emails
    legitimate_emails = list(Emails.objects.filter(
        type__id=1))  # legitimate emails

    # filtering disabled emails
    phishing_emails_filtered = [
        email for email in phishing_emails if email.enabled == True]
    legitimate_emails_filtered = [
        email for email in legitimate_emails if email.enabled == True]

    random_phishing_emails = []
    random_legitimate_emails = []

    generatorENV = os.environ.get('EMAIL_GENERATOR')
    # Default generator is fallback if no other generator name matches
    generator = DEFAULT_GENERATOR

    # List of all available email generators
    if generatorENV == 'GENERATOR_CORRECTNESS_EASY':
        generator = GENERATOR_CORRECTNESS_EASY
    elif generatorENV == 'GENERATOR_CORRECTNESS_HARD':
        generator = GENERATOR_CORRECTNESS_HARD

    random_phishing_emails = generator(
        phishing_emails_filtered, number_of_phishing_emails)
    random_legitimate_emails = generator(
        legitimate_emails_filtered, number_of_legit_emails)

    complete_list = random_phishing_emails + random_legitimate_emails
    # we need to shuffle the list so phishing and legit emails will mix
    random.shuffle(complete_list)

    GameRuns.objects.get(id=gamerun_id).emails.set(complete_list)
