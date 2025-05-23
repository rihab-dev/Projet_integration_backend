import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-location',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './details-location.component.html',
  styleUrls: ['./details-location.component.css']
})
export class DetailsLocationComponent implements OnInit {
  location: any;
  comments: any[] = [];
  errorMessage: string | null = null;
  isLoading = true;
  isCommentLoading = false;
  commentForm: FormGroup;
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || isNaN(+id)) {
      this.handleError('ID invalide');
      return;
    }

    this.loadLocationDetails(+id);
    this.loadComments(+id);
  }

  loadLocationDetails(id: number): void {
    this.http.get(`${this.apiUrl}/locations/${id}`).subscribe({
      next: (response: any) => {
        this.location = response.data || response;
        this.isLoading = false;
      },
      error: (error) => this.handleError('Erreur lors du chargement des détails', error)
    });
  }

  loadComments(locationId: number): void {
    this.http.get(`${this.apiUrl}/locations/${locationId}/commentaires`).subscribe({
      next: (response: any) => {
        this.comments = response.data || response;
      },
      error: (error) => console.error('Error loading comments:', error)
    });
  }

  onSubmitComment(): void {
    if (this.commentForm.invalid || this.isCommentLoading) return;

    this.isCommentLoading = true;
    this.errorMessage = null;

    const locationId = this.route.snapshot.paramMap.get('id');
    if (!locationId) {
      this.handleError('ID de location manquant');
      return;
    }

    const commentData = {
      contenu: this.commentForm.value.content,
      auteur: this.commentForm.value.author
    };

    console.log('Sending comment data:', commentData); // Debug log

    this.http.post(
      `${this.apiUrl}/locations/${locationId}/commentaires`,
      commentData,
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        } 
      }
    ).subscribe({
      next: (response: any) => {
        console.log('Comment added successfully:', response);
        this.comments.unshift(response);
        this.commentForm.reset();
        this.isCommentLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding comment:', error);
        this.errorMessage = this.getErrorMessage(error);
        this.isCommentLoading = false;
      }
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Erreur de connexion au serveur';
    }
    if (error.error?.message) {
      return error.error.message;
    }
    if (error.status === 400) {
      return 'Données invalides';
    }
    return 'Une erreur est survenue lors de l\'ajout du commentaire';
  }

  private handleError(message: string, error?: any): void {
    this.errorMessage = message;
    this.isLoading = false;
    if (error) {
      console.error(message, error);
    }
  }
}