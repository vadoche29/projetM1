import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://10.10.64.10:8000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  //appel de la fonction login avec les paramètres email et password
  //Création d'un token dans le local storage si connexion OK
  login(email: string, password: string) {
    return this.http.post(this.loginUrl, {email, password}).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        console.log('Token :', response.token);
        this.router.navigate(['page-admin']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
