import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = signal('eCommerce');
  router = inject(Router);
  authSerivec = inject(AuthService);

  currentUrl = signal(this.router.url);

  constructor() {
    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
  }

  isLoginPage = computed(() => this.currentUrl().startsWith('/login'));
  isProfile = computed(() => this.currentUrl().startsWith('/profile'));
  isDashboard = computed(() => this.currentUrl().startsWith('/dashboard'));
  isMerchantDashboard = computed(() => this.currentUrl().startsWith('/merchant/'));
  isNotFound = computed(() => this.currentUrl().startsWith('/not-found'))
  isSearchResult = computed(() => this.currentUrl().startsWith('/search'))

  showProfile = computed(() => this.isDashboard() || this.isMerchantDashboard());
  showDashboard = computed(() => this.isMerchantDashboard() || this.isProfile() || this.isSearchResult());
  showRegister = computed(() => this.isLoginPage());
  showLogin = computed(() => 0);
  showSearch = computed(() => this.isDashboard() || this.isSearchResult());
}