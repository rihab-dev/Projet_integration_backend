/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {RegistrationService} from '../../services/registration.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.registrationService.verifyEmail(token).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => {
          this.error = err.error?.message || 'Lien invalide ou expiré';
          console.error('Verification error:', err);
        }
      });
    } else {
      this.error = 'Token manquant dans l\'URL';
    }
  }
}*/
