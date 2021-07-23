from django.db import models


class Appointment(models.Model):
    title = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()


class Shift(models.Model):
    title = models.CharField(max_length=200)
    begin_shift = models.DateTimeField()
    end_shift = models.DateTimeField()


class ComputedAppointment(models.Model):
    patient_id = models.CharField(max_length=200)
    diagnosis_id = models.CharField(max_length=200)
    cancer_region = models.CharField(max_length=200)
    cancer_stage = models.CharField(max_length=200)
    event_id = models.CharField(max_length=200)
    activity_type = models.CharField(max_length=200)
    technique = models.CharField(max_length=200)
    duration_in_mins = models.CharField(max_length=200)
    machine = models.CharField(max_length=200)
    earliest_date = models.CharField(max_length=200)
    latest_date = models.CharField(max_length=200)
    computedEarliestTime = models.DateTimeField()
    computedLatestTime = models.DateTimeField()
