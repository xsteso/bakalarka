from django.db import models


class Signs(models.Model):
    """
    Stores a single phishing sign entry
    """
    text = models.CharField(max_length=300)
