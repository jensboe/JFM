# Generated by Django 4.1.5 on 2023-01-23 22:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0007_member_is_instructor'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='member',
            options={'ordering': ['is_instructor', 'lastname'], 'verbose_name': 'member', 'verbose_name_plural': 'members'},
        ),
    ]