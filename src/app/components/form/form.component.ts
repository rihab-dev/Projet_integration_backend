import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FormComponent {
  selectedDate: string | null = null;

  formData = {
    lieu: '',
    heure: ''
    // notes: '' // Décommenter si utilisé
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'];
    });
  }

  submitForm(form: NgForm) {
    if (form.valid && this.selectedDate) {
      const requestData = {
        date: this.selectedDate,
        heure: this.formData.heure,
        lieu: this.formData.lieu,
        user: 26
        // notes: this.formData.notes || null
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://localhost:8000/api/rendezvous/new', requestData, { headers })
        .subscribe({
          next: (response) => {
            console.log('Rendez-vous créé', response);
            this.router.navigate(['/confirmation']);
          },
          error: (err) => {
            console.error('Erreur lors de la création du rendez-vous', err);
            if (err.error) {
              console.error('Détails de l\'erreur:', err.error);
            }
          }
        });
    } else {
      console.warn('Formulaire invalide ou date manquante.');
    }
  }
}
