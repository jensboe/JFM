# Generated by Django 4.1.5 on 2023-01-21 12:10

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0006_alter_member_options_alter_member_firstname_and_more'),
        ('events', '0007_remove_event_end_time_remove_event_start_time_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='event',
            options={'ordering': ['start_date'], 'verbose_name': 'event', 'verbose_name_plural': 'events'},
        ),
        migrations.AlterModelOptions(
            name='participant',
            options={'ordering': ['member'], 'verbose_name': 'participant', 'verbose_name_plural': 'participants'},
        ),
        migrations.AlterField(
            model_name='event',
            name='end_date',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='end time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_date',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='start time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='title',
            field=models.CharField(max_length=200, verbose_name='title'),
        ),
        migrations.AlterField(
            model_name='participant',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.event', verbose_name='event'),
        ),
        migrations.AlterField(
            model_name='participant',
            name='member',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='members.member', verbose_name='member'),
        ),
    ]
