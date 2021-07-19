from django.conf.urls import url
from django.urls import re_path

from . import views

app_name = 'cal'
urlpatterns = [
    re_path(r'^api/events/$', views.events_list),
    re_path(r'^api/events/(\d+)$', views.events_detail),
]
