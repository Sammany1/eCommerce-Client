import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { DEFAULT_USER, User, UserRole } from '../../core/models/user.model';
import { catchError } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  user = signal<User>(DEFAULT_USER);
  UserRole = UserRole;

  ngOnInit() {
    this.userService
    .getProfile()
    .subscribe(user => {
      this.user.set(user);
    })
  }

  logout() {
    this.authService.clearToken();
    this.router.navigateByUrl('/login');
  }
}
