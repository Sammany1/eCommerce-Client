import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
  token = signal<string | null>(null);

  setToken(token: string){
    this.token.set(token);
    localStorage.setItem('auth_token', token);
  }

  loadToken() {
    const stored = localStorage.getItem('auth_token');
    if(stored) this.token.set(stored);
  }

  clearToken() {
    this.token.set(null);
    localStorage.removeItem('auth_token');
  }
}
