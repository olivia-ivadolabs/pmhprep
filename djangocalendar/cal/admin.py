import calendar
import datetime

from django.contrib import admin
from cal.models import Event
from django.urls import reverse


class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'start_time', 'end_time']
   
admin.site.register(Event, EventAdmin)
