from rest_framework import serializers
from .models import Presence, Site, SST

class PresenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presence
        fields = '__all__'

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = '__all__'

class SSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = SST
        fields = '__all__'
