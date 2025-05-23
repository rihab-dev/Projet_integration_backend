import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  photos: Photo[]; // Modifier ce type
}

interface Photo {
  id?: number;
  chemin: string;
  location?: Location;
}

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];
  isDeleting: boolean = false;
  deletingId: number | null = null;

  getPhotoUrl(chemin: string): string {
    // Adaptez selon votre configuration Symfony
    return `http://localhost:8000/uploads/photos/${chemin}`;
}
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  hasPhotos(location: Location): boolean {
    return location.photos !== undefined && location.photos !== null && location.photos.length > 0;
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (locations: any) => {
        this.locations = locations.map((location: any) => {
          // Si pas de photos ou tableau vide, utilise l'image par défaut
          const hasPhotos = location.photos && location.photos.length > 0;
          return {
            ...location,
            photos: hasPhotos ? location.photos : [{ chemin: '/assets/prj.jpg' }]
          };
        });
      },
      error: (err) => {
        console.error('Error loading locations:', err);
        // Optionnel: Afficher un message d'erreur à l'utilisateur
      }
    });
  }
  deleteLocation(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette location ?')) {
      this.isDeleting = true;
      this.deletingId = id;

      this.locationService.deleteLocation(id).subscribe({
        next: () => {
          this.locations = this.locations.filter(loc => loc.id !== id);
          alert('Location supprimée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert('Erreur lors de la suppression');
        },
        complete: () => {
          this.isDeleting = false;
          this.deletingId = null;
        }
      });
    }
  }
}