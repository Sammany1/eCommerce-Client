import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

  token = signal<string | null>(null);

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('auth_token', token);
  }

  loadToken() {
    const stored = localStorage.getItem('auth_token');
    if (stored) this.token.set(stored);
  }

  clearToken() {
    this.token.set(null);
    localStorage.removeItem('auth_token');
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginRequest);
  }

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, registerRequest);
  }
}
