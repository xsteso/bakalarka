# Generated by Django 3.2.7 on 2021-12-05 22:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('emails', '0001_initial'),
        ('email_signs', '0001_initial'),
        ('gameruns', '0001_initial'),
        ('email_types', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='emails',
            name='gameruns',
            field=models.ManyToManyField(related_name='gameruns', through='gameruns.EmailGameRuns', to='gameruns.GameRuns'),
        ),
        migrations.AddField(
            model_name='emails',
            name='sign',
            field=models.ManyToManyField(blank=True, to='email_signs.Signs'),
        ),
        migrations.AddField(
            model_name='emails',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='email_types.types'),
        ),
    ]
