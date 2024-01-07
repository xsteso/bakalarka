from django.db import models


class Types(models.Model):
    """
    Stores a single email type entry
    """
    type = models.CharField(max_length=300)
