from django.db import models

class Site(models.Model):
    site_isen = models.CharField(max_length=50, primary_key=True)
    x = models.FloatField()
    y = models.FloatField()
    rayon = models.FloatField()

class SST(models.Model):
    id_sst = models.AutoField(primary_key=True)
    id_firebase = models.CharField(max_length=200)
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    numero_tel = models.CharField(max_length=20)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)

class Incident(models.Model):
    id_incident = models.AutoField(primary_key=True)
    site = models.CharField(max_length=20)
    date = models.DateTimeField()
    lieux = models.CharField(max_length=50)
    caracteristiques = models.CharField(max_length=200)
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    numero_tel_signalant = models.CharField(max_length=20)
    site_isen = models.ForeignKey(Site, on_delete=models.CASCADE)

class Etat(models.Model):
    etat_id = models.IntegerField(primary_key=True)
    etat = models.CharField(max_length=100)

class SST_Incident(models.Model):
    id_sst = models.ForeignKey(SST, on_delete=models.CASCADE)
    id_incident = models.ForeignKey(Incident, on_delete=models.CASCADE)
    etat = models.ForeignKey(Etat, on_delete=models.CASCADE)
    intervenant1 = models.BooleanField(null=True)
    heure_etat = models.DateTimeField()

class SST_Site(models.Model):
    site_isen = models.ForeignKey(Site, on_delete=models.CASCADE)
    id_sst = models.ForeignKey(SST, on_delete=models.CASCADE)
    date_arrivee = models.DateTimeField(null=True)
    date_depart = models.DateTimeField(null=True)
