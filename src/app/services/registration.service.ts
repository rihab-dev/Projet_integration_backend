// src/app/services/registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    telephone: string;
    roles: string[];
    isVerified: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private apiUrl = `http://127.0.0.1:8000/register`;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<RegisterResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<RegisterResponse>(
      this.apiUrl,
      JSON.stringify(userData),
      { headers }
    ).pipe(
      catchError(error => {
        const message = error.error?.errors
          ? Object.values(error.error.errors).flat().join('\n')
          : error.error?.message || 'Erreur lors de l\'inscription';
        return throwError(() => new Error(message));
      })
    );
  }
}
