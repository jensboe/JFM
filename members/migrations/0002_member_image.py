# Generated by Django 4.1.5 on 2023-01-03 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='members'),
        ),
    ]
