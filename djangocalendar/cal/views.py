from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import AppointmentSerializer, ShiftSerializer
from .utils import fetch_appointments, fetch_begin_and_end_shift, connect_to_db


def db_connect():
    connect_to_db()


@api_view(['GET', 'POST'])
def appointment_list(request):
    if request.method == 'GET':
        appointments = fetch_appointments()

        serializer = AppointmentSerializer(appointments, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def shift_list(request):
    shifts = fetch_begin_and_end_shift('2021-01-01', '2021-01-30')
    serializer = ShiftSerializer(shifts, context={'request': request}, many=True)
    return Response(serializer.data)