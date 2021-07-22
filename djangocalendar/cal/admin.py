from django.contrib import admin

from cal.models import Appointment


class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'start_time', 'end_time']


admin.site.register(Appointment, AppointmentAdmin)
