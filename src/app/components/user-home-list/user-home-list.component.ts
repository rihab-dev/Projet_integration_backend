/*user-home-list.component.ts*/
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ajouté pour ngModel

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
  photos: Photo[];
}

interface Photo {
  id?: number;
  chemin: string;
  location?: Location;
}

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Ajout de FormsModule
  templateUrl: './user-home-list.component.html',
  styleUrls: ['./user-home-list.component.css']
})
export class UserHomeListComponent implements OnInit {
  locations: Location[] = [];
  filteredLocations: Location[] = []; // Nouvelle propriété pour les résultats filtrés
  isDeleting: boolean = false;
  deletingId: number | null = null;
  searchTerm: string = ''; // Ajouté pour la recherche
  isLoading: boolean = false; // Ajouté pour le chargement
  searchError: string = '';

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  getPhotoUrl(chemin: string): string {
    return `http://localhost:8000/uploads/photos/${chemin}`;
  }

  hasPhotos(location: Location): boolean {
    return location.photos?.length > 0;
  }

  loadLocations(): void {
    this.isLoading = true;
    this.locationService.getLocations().subscribe({
      next: (locations: any) => {
        this.locations = locations.map((location: any) => ({
          ...location,
          photos: location.photos?.length ? location.photos : [{ chemin: '/assets/prj.jpg' }]
        }));
        this.filteredLocations = [...this.locations]; // Initialise les résultats filtrés
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading locations:', err);
        this.isLoading = false;
        this.searchError = 'Erreur lors du chargement des locations';
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
          this.filteredLocations = this.filteredLocations.filter(loc => loc.id !== id);
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

  searchLocations(): void {
    if (!this.searchTerm.trim()) {
      this.filteredLocations = [...this.locations];
      return;
    }
  
    this.isLoading = true;
    this.searchError = '';
  
    this.locationService.searchByVille(this.searchTerm).subscribe({
      next: (response) => { // Changez 'data' en 'response'
        console.log('API response:', response);
        
        // Accédez  à response.data au lieu de response
        this.filteredLocations = response.data.map((location: any) => ({
          ...location,
          photos: location.photos?.length ? location.photos : [{ chemin: '/assets/prj.jpg' }]
        }));
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.searchError = 'Erreur lors de la recherche';
        this.isLoading = false;
      }
    });
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredLocations = [...this.locations];
  }
}