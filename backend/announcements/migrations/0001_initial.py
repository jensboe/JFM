# Generated by Django 4.1.5 on 2023-01-23 22:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='title')),
                ('start_date', models.DateField(default=django.utils.timezone.now, verbose_name='start time')),
            ],
            options={
                'verbose_name': 'announcement',
                'verbose_name_plural': 'announcements',
            },
        ),
    ]
