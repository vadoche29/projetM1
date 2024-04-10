import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signaler',
  standalone: true,
  imports: [],
  templateUrl: './signaler.component.html',
  styleUrl: './signaler.component.scss'
})

export class SignalerComponent {

  constructor(private apiService: ApiService,
              private route : ActivatedRoute,
              private notificationService : NotificationService,
              private router : Router) {}

  getRouteVille(): string {
    return this.route.snapshot.params['ville'];
  }  

  signaler() {
    const salle = (document.querySelector('input[name="salle"]') as HTMLInputElement).value;
    const contexte = (document.querySelector('textarea[name="contexte"]') as HTMLTextAreaElement).value;
    const nom = (document.querySelector('input[name="nom"]') as HTMLInputElement).value;
    const prenom = (document.querySelector('input[name="prénom"]') as HTMLInputElement).value;
    const tel = (document.querySelector('input[name="tel"]') as HTMLInputElement).value;

    if (!salle || !contexte || !nom || !prenom || !tel) {
      alert('Veuillez remplir tous les champs.');
      return; // Arrêter l'exécution de la fonction s'il y a des champs vides
    }

    const incidentData = {
      site: this.getRouteVille(),
      date: new Date(),
      lieux: salle,
      caracteristiques: contexte,
      nom: nom,
      prenom: prenom,
      numero_tel_signalant: tel,
      site_isen: this.getRouteVille()
    };

    this.apiService.createIncident(incidentData)
    .subscribe(
      (response) => {
        console.log('Incident signalé avec succès:', response);

        const incidentId = response.id_incident;

      // Personnalisation de la notification
      const title = salle;
      const body =  contexte;
      const topic = this.getRouteVille();

      const infoSupplementaires = {
        salle: salle,
        contexte: contexte,
        nom: nom,
        prenom: prenom,
        tel: tel,
        incident_id: incidentId.toString(),
        notification_type : "alarm"
      };

      // Envoi de la notification avec les données personnalisées
      this.notificationService.envoyerNotification(title, body, topic, infoSupplementaires);      
      this.router.navigate(['/incident', incidentId]);
        
      },
      (error) => {
        console.error('Erreur lors de la signalisation de l\'incident:', error);
      }
    );
    // Réinitialiser les champs du formulaire après avoir signalé l'incident avec succès
    this.resetForm();
}

resetForm() {
  // Réinitialisez les champs du formulaire après avoir signalé l'incident avec succès
  (document.querySelector('input[name="salle"]') as HTMLInputElement).value = '';
  (document.querySelector('textarea[name="contexte"]') as HTMLTextAreaElement).value = '';
  (document.querySelector('input[name="nom"]') as HTMLInputElement).value = '';
  (document.querySelector('input[name="prénom"]') as HTMLInputElement).value = '';
  (document.querySelector('input[name="tel"]') as HTMLInputElement).value = '';
}

}

export function getBoxTitle() {
  const element = document.querySelector('.lieu-component .signaler-button');
  const title = element ? element.getAttribute('title') : null;
  return title;
}
