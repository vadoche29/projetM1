from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.serializers import serialize
from .models import Presence, Site, SST
from django.http import JsonResponse
from .serializers import SSTSerializer, SiteSerializer, PresenceSerializer

@api_view(['GET'])
def getDataSST(request):
    sst_data = SST.objects.all()  # Récupérer toutes les données Presence
    serialized_data = SSTSerializer(sst_data, many=True)
    return Response(serialized_data.data)

@api_view(['GET'])
def getDataPresence(request):
    presence_data = Presence.objects.all()  # Récupérer toutes les données Presence
    serialized_data = PresenceSerializer(presence_data, many=True)
    return Response(serialized_data.data)

@api_view(['GET'])
def getDataSite(request):
    site_data = Site.objects.all()  # Récupérer toutes les données Presence
    serialized_data = SiteSerializer(site_data, many=True)
    return Response(serialized_data.data)