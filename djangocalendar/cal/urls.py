from django.urls import re_path

from . import views

app_name = "cal"
urlpatterns = [
    re_path(r"^api/appointments/$", views.appointment_list),
    re_path(r"^api/shifts/$", views.shift_list),
    re_path(r"^api/computed_appointments/$", views.computed_appointment_time_list),
]
