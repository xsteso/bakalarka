release: python manage.py migrate
web: gunicorn trainingApi.wsgi --timeout=120 --workers=3 --threads=3 --worker-connections=1000 --log-file - 