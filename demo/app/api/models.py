from django.db import models

class Presence(models.Model):
    presence_sur_le_site = models.IntegerField()
    


class Site(models.Model):
    isen = models.CharField(max_length=10)


class SST(models.Model):
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    sexe = models.CharField(max_length=10)
    age = models.IntegerField()
    identifiant_presence = models.ForeignKey(Presence, on_delete=models.CASCADE)
    identifiant_site = models.ForeignKey(Site, on_delete=models.CASCADE)

