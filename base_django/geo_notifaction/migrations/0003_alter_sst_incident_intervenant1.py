# Generated by Django 3.2.25 on 2024-04-10 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geo_notifaction', '0002_authentication'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sst_incident',
            name='intervenant1',
            field=models.CharField(default=' ', max_length=100),
            preserve_default=False,
        ),
    ]
