from rest_framework import viewsets
from settings.models import Settings, SettingsTranslations
from settings.serializers import SettingSerializer, SettingsTranslationSerializer


class SettingViewSet(viewsets.ModelViewSet):
    queryset = Settings.objects.all()
    serializer_class = SettingSerializer


class SettingTranslationViewSet(viewsets.ModelViewSet):
    queryset = SettingsTranslations.objects.all()
    serializer_class = SettingsTranslationSerializer
