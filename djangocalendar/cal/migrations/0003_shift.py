# Generated by Django 3.2 on 2021-07-22 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cal', '0002_rename_event_appointment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('begin_shift', models.DateTimeField()),
                ('end_shift', models.DateTimeField()),
            ],
        ),
    ]
