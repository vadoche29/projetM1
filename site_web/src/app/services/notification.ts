import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://10.10.64.10:3000';

  constructor(private http: HttpClient) { }

  envoyerNotification(title: string, body: string, topic: string, infoSupplementaires : any = {}): void {
    // Appel HTTP POST à notre API backend pour envoyer la notification
    this.http.post<any>(`${this.apiUrl}/envoyer-notification`, {title, body, topic, infoSupplementaires})
      .subscribe(
        (response) => {
          console.log('Notification envoyée avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de la notification', error);
        }
      );
  }
}

