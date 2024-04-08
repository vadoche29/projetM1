import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'http://10.10.64.10:8000/api';

  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  private dataSstSiteSubject = new BehaviorSubject<any[]>([]);
  dataSstSite$ = this.dataSstSiteSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllSst(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sst`)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  getAllSite(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/site`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllIncident(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/incident`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllSstIncident(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sst-incident`)
      .pipe(
        catchError(this.handleError)
      );
  }  

  getAllSstSite(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sst-site`)
      .pipe(
        catchError(this.handleError)
      );
  }  

  getAllEtat(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/etat`)
      .pipe(
        catchError(this.handleError)
      );
  } 

  createIncident(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/incident`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof Error) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else if (error.status) {
      // Erreur côté serveur avec un code HTTP
      errorMessage = `Server returned code ${error.status}, message: ${error.message}`;
    } else {
      // Erreur côté serveur sans code HTTP
      errorMessage = `Server error: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

