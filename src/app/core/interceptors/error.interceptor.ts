import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        notificationService.showError(
          error.error?.message || error.statusText || 'An unexpected error occurred.'
        );
      } else {
        notificationService.showError('An unexpected error occurred.');
      }
      return throwError(() => error);
    })
  );
};