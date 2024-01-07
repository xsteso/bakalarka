from django.db import models

class Settings(models.Model):
    """
    Stores a single settings entry
    """
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=255) # https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types

class SettingsTranslations(models.Model):
    """
    Stores a single translation entry for setting
    """
    setting = models.OneToOneField(Settings, on_delete=models.CASCADE, related_name="setting")
    text_translation = models.CharField(max_length=200)





