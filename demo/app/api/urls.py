from django.urls import path
from . import views

urlpatterns = [
	path('api/sst', views.getDataSST),
	path('api/presence', views.getDataPresence),
	path('api/site', views.getDataSite),
]