// src/app/interfaces/auth-response.ts
export interface AuthResponse {
  email: string;
  roles: string[];
  token: string;
  user_id?: number;  // Optionnel selon votre API
  expires_in?: number; // Optionnel
}
