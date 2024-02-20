import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'http://10.10.64.10:8000/api';

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any[]> {
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

