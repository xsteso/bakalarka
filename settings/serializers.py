from rest_framework import serializers
from settings.models import Settings, SettingsTranslations


class SettingSerializer(serializers.ModelSerializer):
    # On GET request return also related translation of setting
    translated_text = serializers.CharField(
        source='setting.text_translation',
        read_only=True
    )

    class Meta:
        model = Settings
        fields = ['id',
                  'key',
                  'value',
                  'type',
                  'translated_text']


class SettingsTranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SettingsTranslations
        fields = ('id',
                  'setting',
                  'text_translation')
