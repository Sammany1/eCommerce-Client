import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../tokens/api-base-url.token';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  baseUrl = inject(API_BASE_URL);

  getProfile() {
    return this.http.get<User>(`${this.baseUrl}/users/me`);
  }
}
