from django.conf.urls import url
from django.urls import re_path

from . import views

app_name = 'cal'
urlpatterns = [
    url(r'^index/$', views.index, name='index'),
    url(r'^calendar/$', views.CalendarView.as_view(), name='calendar'),
    url(r'^event/new/$', views.event, name='event_new'),
    url(r'^event/edit/(?P<event_id>\d+)/$', views.event, name='event_edit'),
    re_path(r'^api/events/$', views.events_list),
    re_path(r'^api/events/(\d+)$', views.events_detail),
]
