import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  sendNotification(token: string, title: string, body: string) {
    const url = 'http://10.10.64.10:3000/send-notification'; // Replace with your server address
    const payload = { token, title, body };
    return this.http.post(url, payload);
  }
}

