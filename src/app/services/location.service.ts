import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

interface Photo {
  id?: number;
  chemin: string;
  location?: Location;
}

interface Location {
  id?: number;
  description: string;
  prix: number;
  superficie: number;
  type: string;
  disponibilite: boolean;
  meuble: boolean;
  adresse: string;
  ville: string;
  photos?: Photo[];
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:8000/api/locations'; // Gardez cette URL de base

  constructor(private http: HttpClient) {}

  createLocation(location: Location): Observable<any> {
    // Supprimez le '/location' à la fin
    return this.http.post(this.apiUrl, location, { // Envoie à http://localhost:8000/api/locations
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  getLocations(): Observable<Location[]> {
    // Supprimez aussi le '/location' ici
    return this.http.get<{data: Location[]}>(this.apiUrl).pipe(
      map((response: { data: any; }) => response.data)
    );
  }

  addPhotosToLocation(locationId: number, photos: File[]): Observable<any> {
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo); // Format correct pour Symfony
    });

    return this.http.post(`${this.apiUrl}/${locationId}/photos`, formData, {
      headers: {
        // Ne pas mettre 'Content-Type': 'multipart/form-data' - le navigateur le fera automatiquement
      }
    }).pipe(
      catchError(error => {
        console.error('Photo upload error:', error);
        throw error;
      })
    );
}}