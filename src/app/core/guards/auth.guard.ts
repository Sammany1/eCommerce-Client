import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return !payload.exp || (Date.now() / 1000) > payload.exp;
  } catch {
    return true;
  }
}

export const AuthGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.token();

  if (!token || isTokenExpired(token)) {
    authService.clearToken();
    router.navigate(['/login']);
    return false;
  }

  return true;
};