import calendar
import datetime

from django.contrib import admin
from cal.models import Event
from django.urls import reverse


class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'start_time', 'end_time']
    change_list_template = 'cal/change_list.html'

    def changelist_view(self, request, extra_context=None):
        after_day = request.GET.get('day__gte', None)
        extra_context = extra_context or {}

        if not after_day:
            d = datetime.date.today()
        else:
            try:
                split_after_day = after_day.split('-')
                d = datetime.date(year=int(split_after_day[0]), month=int(split_after_day[1]), day=1)
            except:
                d = datetime.date.today()

        previous_month = datetime.date(year=d.year, month=d.month, day=1)  # find first day of current month
        previous_month = previous_month - datetime.timedelta(days=1)  # backs up a single day
        previous_month = datetime.date(year=previous_month.year, month=previous_month.month,
                                       day=1)  # find first day of previous month

        last_day = calendar.monthrange(d.year, d.month)
        next_month = datetime.date(year=d.year, month=d.month, day=last_day[1])  # find last day of current month
        next_month = next_month + datetime.timedelta(days=1)  # forward a single day
        next_month = datetime.date(year=next_month.year, month=next_month.month,
                                   day=1)  # find first day of next month

        extra_context['previous_month'] = reverse('admin:events_event_changelist') + '?day__gte=' + str(
            previous_month)
        extra_context['next_month'] = reverse('admin:events_event_changelist') + '?day__gte=' + str(next_month)

        return super(EventAdmin, self).changelist_view(request, extra_context)


admin.site.register(Event, EventAdmin)
