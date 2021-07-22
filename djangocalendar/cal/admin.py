from django.contrib import admin

from cal.models import Appointment, Shift


class AppointmentAdmin(admin.ModelAdmin):
    list_display = ["title", "start_time", "end_time"]


class ShiftAdmin(admin.ModelAdmin):
    list_display = ["title", "begin_shift", "end_shift"]


admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(Shift, ShiftAdmin)