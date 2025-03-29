import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location.service';
import { RouterModule } from '@angular/router';

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
  photos?: { chemin: string }[];
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

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (locations: any) => {
        this.locations = locations;
      },
      error: (err) => {
        console.error('Error loading locations:', err);
      }
    });
  }
}