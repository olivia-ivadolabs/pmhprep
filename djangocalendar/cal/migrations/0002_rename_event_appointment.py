# Generated by Django 3.2 on 2021-07-21 13:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cal', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Event',
            new_name='Appointment',
        ),
    ]