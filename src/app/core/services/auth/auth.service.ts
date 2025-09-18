import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { API_BASE_URL } from '../../tokens/api-base-url.token';
import { LoginRequest } from '../../models/loginRequest.model';
import { LoginResponse } from '../../models/loginResponse.model';
import { RegisterRequest } from '../../models/registerRequest.mode';
import { AuthResponse } from '../../models/authResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl = inject(API_BASE_URL);

  token = signal<string>('');
  isAdmin = computed(() => this.extractRole(this.token()) === 'Admin');
  userId = computed(() => this.extractId(this.token()));

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('auth_token', token);
  }

  loadToken() {
    const stored = localStorage.getItem('auth_token');
    if (stored) this.token.set(stored);
  }

  clearToken() {
    this.token.set('');
    localStorage.removeItem('auth_token');
  }

  private extractRole(token: string) {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const claims = JSON.parse(decoded);
      return claims.role;
    } catch {
      return null;
    }
  }

  private extractId(token: string) {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const claims = JSON.parse(decoded);
      return claims.nameid;
    } catch {
      return null;
    }
  }
  
  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginRequest);
  }

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, registerRequest);
  }
}
