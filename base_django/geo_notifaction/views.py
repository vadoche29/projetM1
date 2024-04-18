from rest_framework.decorators import api_view
import jwt
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Site, SST, Incident, Etat, SST_Incident, SST_Site, Authentication
from .serializers import SSTSerializer, SiteSerializer, IncidentSerializer, EtatSerializer, SST_IncidentSerializer, SST_SiteSerializer, AuthenticationSerializer


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

@api_view(['GET', 'PUT', 'PATCH'])
def updateSST(request, pk):
    try:
        sst_instance = SST.objects.get(pk=pk)
    except SST.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT' or request.method == 'PATCH':
        serializer = SSTSerializer(sst_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
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

@api_view(['GET', 'POST'])
def getDataSSTIncident(request, id_incident):
    if request.method == 'GET':
        sst_incident_data = SST_Incident.objects.filter(id_incident=id_incident)
        serialized_data = SST_IncidentSerializer(sst_incident_data, many=True)
        return Response(serialized_data.data)
    elif request.method == 'POST':
        serializer = SST_IncidentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def getDataSSTSite(request):
    if request.method == 'GET':
        sst_site_data = SST_Site.objects.all()
        serialized_data = SST_SiteSerializer(sst_site_data, many=True)
        return Response(serialized_data.data)
    elif request.method == 'POST':
        serializer = SST_SiteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteSSTSiteBySSTId(request, id_sst):
    try:
        sst_sites = SST_Site.objects.filter(id_sst=id_sst)
        sst_sites.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except SST_Site.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT', 'PATCH'])
def updateSSTSite(request, pk):
    try:
        sst_site_instance = SST_Site.objects.get(pk=pk)
    except SST_Site.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT' or request.method == 'PATCH':
        serializer = SST_SiteSerializer(sst_site_instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])          
def authenticate_user(request):
    if request.method == 'POST':
        email = request.data['email']
        password = request.data['password']
        
        user = Authentication.objects.get(email=email, password=password)

        if user is not None:
            # Si l'utilisateur est authentifié, générer un token JWT
            token = jwt.encode({'email': email}, settings.SECRET_KEY)
            return Response({'token': token})
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)