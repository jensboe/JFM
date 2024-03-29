# Generated by Django 4.1.5 on 2023-01-06 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0005_alter_participant_options_participant_participation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='participation',
            field=models.CharField(choices=[('PRE', 'present'), ('EXC', 'excused'), ('ABS', 'absent')], default='ABS', max_length=3),
        ),
    ]
