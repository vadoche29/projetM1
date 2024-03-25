import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiUrl = 'http://10.10.64.10:3000/send-notification';

  constructor(private http: HttpClient) { }

  sendNotification(registrationToken: string, title: string, body: string) {
    return this.http.post(this.apiUrl, { registrationToken, title, body });
  }
}
