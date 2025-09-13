import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { DEFAULT_USER, User, UserRole } from '../../core/models/user.model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userService = inject(UserService);
  user = signal<User>(DEFAULT_USER);
  UserRole = UserRole;

  ngOnInit() {
    this.userService
    .getProfile()
    .pipe(
      catchError(err => {
        throw err;
      })
    ).subscribe(user => {
      this.user.set(user);
    })
  }

}
