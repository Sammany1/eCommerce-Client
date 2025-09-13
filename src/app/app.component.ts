import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/ui/header/header.component";
import { AuthService } from './core/services/auth/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'eCommerce';
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.loadToken();
  }
}
