from django.urls import path
from . import views

"""
Ce programme permet de créer des urls pour les différentes vues de la base de données.
Certaines URLs ne sont accessibles que selon certains critères.
"""

urlpatterns = [
    path('api/site', views.getDataSite),
    path('api/sst', views.getDataSST),
    path('api/sst/<int:pk>', views.updateSST),
    path('api/incident', views.getDataIncident),
    path('api/etat', views.getDataEtat),
    path('api/sst-incident/<int:id_incident>', views.getDataSSTIncident),
    path('api/sst-site', views.getDataSSTSite),
    path('api/sst-site/delete-by-sst-id/<int:id_sst>', views.deleteSSTSiteBySSTId, name='delete-sst-site-by-sst-id'),
    path('api/sst-site/update-departure-date/<int:pk>', views.updateSSTSite, name='update-departure-date'),
    path('api/auth', views.authenticate_user),
]