import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RegistrationService} from '../services/registration.service';
import { Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registerForm: FormGroup;
  message = '';
  error = '';
  constructor(private fb: FormBuilder, private registrationService: RegistrationService)
  {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      plainPassword: this.fb.group({
        first: ['', [Validators.required, Validators.minLength(6)]],
        second: ['', Validators.required]
      })
    });
  }
  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const userData = this.registerForm.value;

    this.registrationService.register(userData).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = '';
        this.registerForm.reset();
      },
      error: (err) => {
        this.error = err.message;
        this.message = '';
      }
    });
  }
}
