"""trainingApi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path, include
from accounts.api import LoginAPI, UserAPI, RegisterAPI
from email_statistics_calculator.views import get_email_with_statistics_by_id, get_emails_with_statistics
from emails.views import parse, update_enabled
from gamerun_manager.views import init_gamerun, set_player_answer, next_email
from gamerun_summary.views import get_gamerun_summary, get_gamerun_with_statistics_by_email, get_gamerun_with_statistics_by_id, get_gameruns_with_statistics
from gameruns.views import emails_from_gamerun
from .router import router
from knox import views as knox_views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from django.views.generic import TemplateView
import os


schema_view = get_schema_view(
    openapi.Info(
        title="Phishing Game API",
        default_version='v1',
    ),
    public=True,
    permission_classes=[permissions.AllowAny]
)

urlpatterns = []

if os.environ.get('SWAGGER_ENABLED') == 'True':
    urlpatterns.append(re_path(r'^swagger(?P<format>\.json|\.yaml)$',
                       schema_view.without_ui(cache_timeout=0), name='schema-json'))
    urlpatterns.append(re_path(r'^swagger/$', schema_view.with_ui('swagger',
                                                                  cache_timeout=0), name='schema-swagger-ui'))
    urlpatterns.append(re_path(r'^redoc/$', schema_view.with_ui('redoc',
                                                                cache_timeout=0), name='schema-redoc'))

urlpatterns.extend([

    path('api/gamerun/init/', init_gamerun),
    path('api/gamerun/setAnswer/', set_player_answer),
    path('api/gamerun/nextEmail/', next_email),
    path('api/gamerun/summary/<int:gamerun_id>/', get_gamerun_summary),
    path('api/gameruns_with_statistics/', get_gameruns_with_statistics),
    path('api/gameruns_with_statistics/<int:gamerun_id>/',
         get_gamerun_with_statistics_by_id),
    path('api/gameruns_with_statistics_by_email/<int:email_id>/',
         get_gamerun_with_statistics_by_email),
    path('api/emails_with_statistics/', get_emails_with_statistics),
    path('api/emails_with_statistics/<int:email_id>/',
         get_email_with_statistics_by_id),
    path('api/email-enabled/<int:email_id>/', update_enabled),
    path('api/gameruns/<int:gamerun_id>/emails/', emails_from_gamerun),
    path('api/emails/import/', parse),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view()),
    path('api/', include(router.urls), name='api'),
    re_path(r'.*', TemplateView.as_view(template_name='index.html'))

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))
