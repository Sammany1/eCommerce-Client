import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { single } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse.model';
import { API_BASE_URL } from '../../tokens/api-base-url.token';
import { LoginRequest } from '../../models/loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);
  baseUrl = inject(API_BASE_URL);

  getLoginResponse(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginRequest);
  }

}
