import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';

interface Location {
  description: string;
  prix: number;
  superficie: number;
  type: string;
  disponibilite: boolean;
  meuble: boolean;
  adresse: string;
  ville: string;
}

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent {
  location: Location = {
    description: '',
    prix: 0,
    superficie: 0,
    type: 'Appartement',
    disponibilite: true,
    meuble: false,
    adresse: '',
    ville: ''
  };
  selectedPhotos: File[] = [];

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  onFileChange(event: any): void {
    this.selectedPhotos = Array.from(event.target.files);
  }

  onSubmit(): void {
    this.locationService.createLocation(this.location).subscribe({
        next: (response: any) => {
            console.log('Location created:', response);
            if (this.selectedPhotos.length > 0 && response.data?.id) {
                this.locationService.addPhotosToLocation(response.data.id, this.selectedPhotos)
                    .subscribe({
                        next: () => this.router.navigate(['/list']),
                        error: (photoError) => {
                            console.error('Photo upload failed but location was created', photoError);
                            this.router.navigate(['/list']); // Redirige quand même
                        }
                    });
            } else {
                this.router.navigate(['/list']);
            }
        },
        error: (err) => {
            console.error('Location creation failed:', err);
        }
    });
}
}