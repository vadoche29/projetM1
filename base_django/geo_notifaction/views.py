from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Site, SST, Incident, Etat, SST_Incident, SST_Site
from .serializers import SSTSerializer, SiteSerializer, IncidentSerializer, EtatSerializer, SST_IncidentSerializer, SST_SiteSerializer


@api_view(['GET','POST'])
def getDataSST(request):
    if request.method == 'GET':
        sst_data = SST.objects.all()
        serialized_data = SSTSerializer(sst_data, many=True)
        return Response(serialized_data.data)
    elif request.method == 'POST':
        serializer = SSTSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def getDataIncident(request):
    if request.method == 'GET':
        incident_data = Incident.objects.all()
        serialized_data = IncidentSerializer(incident_data, many=True)
        return Response(serialized_data.data)
    elif request.method == 'POST':
        serializer = IncidentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getDataSite(request):
    site_data = Site.objects.all()
    serialized_data = SiteSerializer(site_data, many=True)
    return Response(serialized_data.data)

@api_view(['GET'])
def getDataEtat(request):
    etat_data = Etat.objects.all()
    serialized_data = EtatSerializer(etat_data, many=True)
    return Response(serialized_data.data)

@api_view(['GET'])
def getDataSSTIncident(request):
    sst_incident_data = SST_Incident.objects.all()
    serialized_data = SST_IncidentSerializer(sst_incident_data, many=True)
    return Response(serialized_data.data)

@api_view(['GET'])
def getDataSSTSite(request):
    sst_site_data = SST_Site.objects.all()
    serialized_data = SST_SiteSerializer(sst_site_data, many=True)
    return Response(serialized_data.data)
