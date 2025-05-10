import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocationService } from '../services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
  editForm: FormGroup;
  isLoading = true; // Chargement initial
  errorMessage: string | null = null;
  locationId: number;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.locationId = +this.route.snapshot.params['id'];
    
    // Initialisation du formulaire
    this.editForm = this.fb.group({
      description: ['', [Validators.required]],
      prix: [0, [Validators.required]],
      superficie: [0, [Validators.required]],
      type: ['', [Validators.required]],
      disponibilite: [false],
      meuble: [false],
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadLocationData();
  }

  // Dans edit-location.component.ts
loadLocationData(): void {
  this.locationService.getLocationById(this.locationId).subscribe({
    next: (response) => {
      // Accédez aux données via response.data
      const location = response.data;
      
      console.log('Données à patcher:', location); // Debug

      this.editForm.patchValue({
        description: location.description,
        prix: location.prix,
        superficie: location.superficie,
        type: location.type,
        disponibilite: location.disponibilite,
        meuble: location.meuble,
        adresse: location.adresse,
        ville: location.ville
      });

      console.log('Formulaire après patch:', this.editForm.value); // Debug
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Erreur:', error);
      this.errorMessage = 'Échec du chargement des données';
      this.isLoading = false;
    }
  });
}


  onSubmit(): void {
    if (this.editForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.locationService.updateLocation(this.locationId, this.editForm.value)
      .subscribe({
        next: () => this.router.navigate(['/list']),
        error: (err) => {
          this.errorMessage = 'Échec de la mise à jour';
          this.isLoading = false;
          console.error('Error:', err);
        }
      });
  }

  private markAllAsTouched(): void {
    Object.values(this.editForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/locations']);
  }
}