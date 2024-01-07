from datetime import timedelta
from django.db import models


class GameRuns(models.Model):
    """
    Stores a single gamerun entry
    """
    player_name = models.CharField(max_length=100)
    player_age = models.IntegerField(default=0)
    player_gender = models.CharField(max_length=100, null=True)
    emails = models.ManyToManyField(
        'emails.Emails', through='EmailGameRuns', related_name='emails_in_gamerun')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True)


class EmailGameRuns(models.Model):
    """
    Stores a single entry connecting email and gamerun
    """
    email = models.ForeignKey('emails.Emails', on_delete=models.CASCADE)
    game_run = models.ForeignKey(GameRuns, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)
    player_answer = models.BooleanField(null=True)
    duration = models.DurationField(default=timedelta())

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=order):
        """
        Sets order of the email in gamerun automatically.
        """
        if self.order == 0:  # order 0 means invalid, order should be > 1
            try:
                # find all entries from EmailGameRuns with current gamerun
                # and order descending by order field
                recent = EmailGameRuns.objects.filter(
                    game_run__exact=self.game_run
                ).order_by(
                    '-order'
                )[0]
                self.order = recent.order + 1
            except IndexError:  # if all email from current gamerun has order = 0
                self.order = 1

        super(EmailGameRuns, self).save(force_insert, force_update)
