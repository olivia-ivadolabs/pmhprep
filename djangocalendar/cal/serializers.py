from rest_framework import serializers

from .models import Appointment, Shift, ComputedAppointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ("pk", "title", "start_time", "end_time")


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ("title", "begin_shift", "end_shift")


class ComputedAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComputedAppointment
        fields = ("patient_id",
                  "diagnosis_id",
                  "cancer_region",
                  "cancer_stage",
                  "event_id",
                  "activity_type",
                  "technique",
                  "duration_in_mins",
                  "machine",
                  "earliest_date",
                  "latest_date",
                  "computedEarliestTime",
                  "computedLatestTime")
