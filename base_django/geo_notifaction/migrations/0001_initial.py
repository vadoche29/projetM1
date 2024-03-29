# Generated by Django 3.0.8 on 2024-03-20 10:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Etat',
            fields=[
                ('etat_id', models.IntegerField(primary_key=True, serialize=False)),
                ('etat', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Incident',
            fields=[
                ('id_incident', models.AutoField(primary_key=True, serialize=False)),
                ('site', models.CharField(max_length=20)),
                ('date', models.DateTimeField()),
                ('lieux', models.CharField(max_length=50)),
                ('caracteristiques', models.CharField(max_length=200)),
                ('nom', models.CharField(max_length=30)),
                ('prenom', models.CharField(max_length=30)),
                ('numero_tel_signalant', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Site',
            fields=[
                ('site_isen', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('rayon', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='SST',
            fields=[
                ('id_sst', models.AutoField(primary_key=True, serialize=False)),
                ('id_firebase', models.CharField(max_length=200)),
                ('nom', models.CharField(max_length=30)),
                ('prenom', models.CharField(max_length=30)),
                ('numero_tel', models.CharField(max_length=20)),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geo_notifaction.Site')),
            ],
        ),
        migrations.CreateModel(
            name='SST_Site',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_arrivee', models.DateTimeField(null=True)),
                ('date_depart', models.DateTimeField(null=True)),
                ('id_sst', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geo_notifaction.SST')),
                ('site_isen', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geo_notifaction.Site')),
            ],
        ),
        migrations.CreateModel(
            name='SST_Incident',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('intervenant1', models.BooleanField(null=True)),
                ('heure_etat', models.DateTimeField()),
                ('etat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geo_notifaction.Etat')),
                ('id_incident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geo_notifaction.Incident')),
                ('id_sst', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geo_notifaction.SST')),
            ],
        ),
        migrations.AddField(
            model_name='incident',
            name='site_isen',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geo_notifaction.Site'),
        ),
    ]
