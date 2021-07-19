from django.db import models
from django.urls import reverse
from django.core.exceptions import ValidationError


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
