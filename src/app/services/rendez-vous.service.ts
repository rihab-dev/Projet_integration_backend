import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = 'http://localhost:8000/api/rendezvous/new';

  constructor(private http: HttpClient) {}

  createRendezVous(date: string, heure: string, lieu: string, userId: number): Observable<any> {
    // Créez l'objet avec tous les champs requis
    const body = {
      date: date,
      heure: heure,
      lieu: lieu,
      user: Number(userId) // Conversion explicite en number
    };

    // Debug complet
    console.log('Données envoyées au serveur:', JSON.stringify(body, null, 2));

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(this.apiUrl, body, { // Ne pas utiliser JSON.stringify ici
      headers: headers,
      withCredentials: true
    });
  }
}
