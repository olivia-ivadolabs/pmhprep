from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import AppointmentSerializer, ComputedAppointmentSerializer, ShiftSerializer
from .utils import connect_to_db, fetch_appointments, fetch_begin_and_end_shift, fetch_computed_appointment_time


def db_connect():
    connect_to_db()


@api_view(["GET", "POST"])
def appointment_list(request):
    if request.method == "GET":
        appointments = fetch_appointments()

        serializer = AppointmentSerializer(appointments, context={"request": request}, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def shift_list(request):
    shifts = fetch_begin_and_end_shift("2021-01-01", "2021-01-30")
    serializer = ShiftSerializer(shifts, context={"request": request}, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def computed_appointment_time_list(request):
    computed_appointments = fetch_computed_appointment_time("2021-01-01", "2021-01-02")
    serializer = ComputedAppointmentSerializer(computed_appointments, context={"request": request}, many=True)
    return Response(serializer.data)
