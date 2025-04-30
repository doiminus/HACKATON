# reservations/routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/reservations/(?P<company_id>\d+)/$', consumers.ReservationUpdateConsumer.as_asgi()),
    re_path(r'ws/reservations/entries/(?P<company_id>\d+)/$', consumers.ReservationEntriesConsumer.as_asgi()),
]
