# Generated by Django 4.1.5 on 2023-01-05 11:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='start_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='event',
            name='start_time',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
    ]