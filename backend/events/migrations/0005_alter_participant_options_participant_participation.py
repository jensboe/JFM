# Generated by Django 4.1.5 on 2023-01-05 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_participant'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='participant',
            options={'ordering': ['member']},
        ),
        migrations.AddField(
            model_name='participant',
            name='participation',
            field=models.CharField(choices=[('ANW', 'present'), ('ENT', 'excused'), ('WEG', 'absent')], default='WEG', max_length=3),
        ),
    ]
