from rest_framework import serializers
from .models import Site, SST, Incident, Etat, SST_Incident, SST_Site

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = '__all__'

class SSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = SST
        fields = '__all__'

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'

class EtatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etat
        fields = '__all__'

class SST_IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SST_Incident
        fields = '__all__'

class SST_SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SST_Site
        fields = '__all__'
