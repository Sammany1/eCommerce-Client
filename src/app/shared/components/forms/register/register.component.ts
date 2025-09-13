import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RegisterRequest } from '../../../../core/models/registerRequest.mode';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  fp = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  showPassword = signal(false);
  message = signal('');

  registerForm = this.fp.nonNullable.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    dateOfBirth: ['', Validators.required]
  });

  register() {
    console.log('Register called', this.registerForm.valid, this.registerForm.getRawValue());
    if (this.registerForm.valid) {
      const { username, firstName, lastName, email, password, confirmPassword, dateOfBirth } = this.registerForm.getRawValue();
      if (password !== confirmPassword) {
        this.message.set('Passwords do not match');
        return;
      }
      const registerRequest: RegisterRequest = {
        username,
        firstName,
        lastName,
        password,
        email,
        dateOfBirth: dateOfBirth
      };
      this.authService
        .register(registerRequest)
        .pipe(
          catchError((err) => {
            this.message.set(err.error);
            return EMPTY;
          })
        ).subscribe((registerResponse) => {
          this.authService.setToken(registerResponse.token)
          this.router.navigateByUrl('/dashboard');
        })

    } else {
      this.message.set('Please fill all fields correctly');
    }
  }

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }
}