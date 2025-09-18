import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Signal to hold the current error message
  errorMessage = signal<string | null>(null);

  showError(message: string) {
    this.errorMessage.set(message);
    // Optionally, clear the message after a timeout
    setTimeout(() => this.errorMessage.set(null), 5000);
  }
}