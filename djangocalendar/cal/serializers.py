from rest_framework import serializers

from .models import Appointment, Shift


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('pk', 'title', 'start_time', 'end_time')


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ('begin_shift', 'end_shift')
