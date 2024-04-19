import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SstIncidentResponse } from '../models/sst-incident.model';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-detail.component.html',
  styleUrl: './incident-detail.component.scss'
})
export class IncidentDetailComponent{

  incidentId!: number;
  id_sst!: number;
  sstData: any[] = []; 
  filteredData: any[] = [];


  constructor(private apiService: ApiService,
              private route : ActivatedRoute) {}

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      this.incidentId = +params['id'];
      this.getIntervenant();
    });
  }

  // Récupération de l'intervenant ayant répondu à l'incident en cliquant sur le bouton disponible
  getIntervenant() {
    this.apiService.getAllSstIncident(this.incidentId).subscribe(
      (response: SstIncidentResponse[]) => {
        if (response.length > 0 && response[0].id_sst) {

          this.id_sst = response[0].id_sst;
          console.log('Identifiant de l\'intervenant:', this.id_sst);

          this.apiService.getAllSst().subscribe(sstData => {
            this.sstData = sstData;

            this.filteredData = this.sstData.filter(sst => sst.id_sst === this.id_sst);       
            console.log(this.filteredData);
          });

        } else {
          console.log('Aucun SST n\'a répondu, merci de patienter.');
          // Rafraîchir la page toutes les 10 secondes
          setInterval(() => {
            this.getIntervenant();
          }, 10000); // 10 secondes en millisecondes
        }
      },
      (error) => {
        console.log('Erreur lors de la récupération de l\'intervenant:', error);
      }
    );
  }
}
