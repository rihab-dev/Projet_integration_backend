import { Component } from '@angular/core';
import { RendezVousService } from '../services/rendez-vous.service';

@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [],
  templateUrl: './rendezvous.component.html',
  styleUrl: './rendezvous.component.css'
})
export class RendezvousComponent {
  constructor(private rendezVousService: RendezVousService) {}

  createRdv() {
    const date = '2025-05-06'; // Format YYYY-MM-DD
    const heure = '14:00';     // Format HH:MM
    const lieu = 'tunis';
    const userId = 26;        // Doit correspondre à un ID existant en base

    this.rendezVousService.createRendezVous(date, heure, lieu, userId).subscribe({
      next: (response) => console.log('Réponse API:', response),
      error: (error) => {
        console.error('Erreur complète:', error);
        if (error.error) {
          console.log('Détails de l\'erreur:', error.error);
          console.log('Données reçues par le serveur:', error.error.received_data);
        }
      }
    });
  }
}
