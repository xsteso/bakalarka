from email_signs.views import SignViewSet
from email_types.views import TypeViewSet
from gameruns.views import GameRunViewSet, EmailGameRunViewSet
from settings.views import SettingTranslationViewSet, SettingViewSet
from emails.views import EmailViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('emails', EmailViewSet, basename='email_list')
router.register('types', TypeViewSet, basename='type_list')
router.register('signs', SignViewSet, basename='sign_list')
router.register('gameruns', GameRunViewSet, basename='gamerun_list')
router.register('egruns', EmailGameRunViewSet, basename='egrun_list')
router.register('settings/translations', SettingTranslationViewSet)
router.register('settings', SettingViewSet, basename='setting_list')

urlpatterns = router.urls
