
import django_filters.rest_framework
from django.utils.translation import gettext_lazy as _
from members.views import MemberEventSerializer
from rest_framework import filters, serializers, viewsets

from .models import Event, Participant


class ParticipantSerializer(serializers.ModelSerializer):
    member = MemberEventSerializer(many=False, read_only=True)
    class Meta:
        model = Participant
        fields = ['pk', 'member', 'participation']
    
class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all().prefetch_related('member')
    serializer_class = ParticipantSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['event']

class EventSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Event
        fields = ['pk', 'title', 'start_date', 'end_date', 'requirement_type', 'participants']

class EventFilter(django_filters.rest_framework.FilterSet):
    end_after = django_filters.rest_framework.IsoDateTimeFilter(field_name="end_date", lookup_expr='gte')
    start_before = django_filters.rest_framework.IsoDateTimeFilter(field_name="start_date", lookup_expr='lte')
    class Meta:
        model = Event
        fields = ['start_date', 'end_date', 'requirement_type']

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().prefetch_related('participants')
    serializer_class = EventSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,
                       filters.OrderingFilter]
    ordering_fields = '__all__'
    filterset_class = EventFilter