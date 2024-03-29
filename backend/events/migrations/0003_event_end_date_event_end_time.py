# Generated by Django 4.1.5 on 2023-01-05 12:27

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_start_date_event_start_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='end_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='event',
            name='end_time',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
    ]
