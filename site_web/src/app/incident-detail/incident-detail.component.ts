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
export class IncidentDetailComponent {

  incidentId!: number;
  intervenant!: string;

  constructor(private apiService: ApiService,
              private route : ActivatedRoute) {}

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      this.incidentId = +params['id'];
      this.getIntervenant();
    });
  }

  getIntervenant() {
    this.apiService.getAllSstIncident(this.incidentId).subscribe(
      (response: SstIncidentResponse[]) => {
        if (response.length > 0 && response[0].intervenant1) {
          this.intervenant = response[0].intervenant1;
        } else {
          this.intervenant = 'Aucun SST n\'a répondu, merci de patienter.';
        }
      },
      (error) => {
        console.log('Erreur lors de la récupération de l\'intervenant:', error);
      }
    );
  }
}
