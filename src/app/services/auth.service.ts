import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';  // Assure-toi que Router est importé
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/login';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }  // Ajout de Router ici

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, {email, password});
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);  // Redirection vers la page de login après déconnexion
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  onLogout(): void {
    this.authService.logout();

  }
}
