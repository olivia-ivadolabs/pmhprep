from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import AppointmentSerializer
from .utils import fetch_appointments, fetch_begin_and_end_shift


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
def appointment_list(request):
    if request.method == 'GET':
        appointments = fetch_begin_and_end_shift('2021-01-01', '2021-01-30')

        serializer = AppointmentSerializer(appointments, context={'request': request}, many=True)

        return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
