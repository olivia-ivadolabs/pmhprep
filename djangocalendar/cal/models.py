from django.db import models


class Appointment(models.Model):
    title = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()


class Shift(models.Model):
    title = models.CharField(max_length=200)
    begin_shift = models.DateTimeField()
    end_shift = models.DateTimeField()
