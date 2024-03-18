from django.shortcuts import render
from django.views import generic
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers, viewsets
from .models import Member



# @method_decorator(login_required, name='dispatch')
class MemberEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['pk', 'firstname', 'lastname']

class MemberSerializer(serializers.ModelSerializer):
    participations = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Member
        fields = ['pk', 'firstname', 'lastname', 'participations']

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer