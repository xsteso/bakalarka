from django.db import models
from email_types.models import Types
from email_signs.models import Signs


class Emails(models.Model):
    """
    Stores a single email entry.
    """
    enabled = models.BooleanField(blank=True, default=True)
    subject = models.CharField(max_length=300)
    sender = models.CharField(max_length=300)
    reply_to = models.CharField(max_length=300, null=True, blank=True)
    recipient = models.CharField(max_length=300, null=True, blank=True)
    date = models.DateTimeField(max_length=300)
    cc = models.CharField(max_length=300, null=True, blank=True)
    body = models.TextField()
    type = models.ForeignKey(Types, on_delete=models.PROTECT)
    sign = models.ManyToManyField(Signs, blank=True)
    gameruns = models.ManyToManyField(
        'gameruns.GameRuns', through='gameruns.EmailGameRuns', related_name='gameruns')
