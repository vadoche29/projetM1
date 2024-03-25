from django.urls import path
from . import views

urlpatterns = [
    path('api/site', views.getDataSite),
    path('api/sst', views.getDataSST),
    path('api/incident', views.getDataIncident),
    path('api/etat', views.getDataEtat),
    path('api/sst-incident', views.getDataSSTIncident),
    path('api/sst-site', views.getDataSSTSite)
]