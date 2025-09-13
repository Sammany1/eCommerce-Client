import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DEFAULT_LOGIN_RESPONSE, LoginResponse } from '../../../../core/models/loginResponse.model';
import { LoginService } from '../../../../core/services/login/login.service';
import { catchError, EMPTY } from 'rxjs';
import { DEFAULT_LOGIN_REQUEST, LoginRequest } from '../../../../core/models/loginRequest.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fp = inject(FormBuilder);
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private router = inject(Router);
  showPassword = signal(false);
  loginResponse = signal<LoginResponse>(DEFAULT_LOGIN_RESPONSE);
  loginRequest = signal<LoginRequest>(DEFAULT_LOGIN_REQUEST);
  message = signal('');


  loginForm = this.fp.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    if (this.loginForm.valid) {
      this.loginRequest.set({
        username: this.loginForm.getRawValue().username,
        password: this.loginForm.getRawValue().password
      });
      console.log('Loggin in with:', this.loginRequest());

      this.loginService
      .getLoginResponse(this.loginRequest())
      .pipe(
        catchError((err) =>{
          console.log(err);
          this.message.set('Invalid Username/Password');
          return EMPTY;
        })
      ).subscribe((loginResponse) => {    
        this.loginResponse.set(loginResponse)
        console.log('Login response:', this.loginResponse());
        if(this.loginResponse().success){
          this.authService.setToken(this.loginResponse().data.token);
          this.router.navigate(['/dashboard']);
        }
      });
    }
    else
      this.message.set('Invalid Username/Password')
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

}
