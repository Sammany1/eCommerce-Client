import { Component, inject, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-search',
  imports: [FormsModule],
  templateUrl: './merchant-search.component.html',
  styleUrl: './merchant-search.component.scss'
})
export class MerchantSearchComponent {
  searchTerm = signal('');
  router = inject(Router);

  search() {
    if(this.searchTerm().length)
      this.router.navigate(['/search'], { queryParams: { query: this.searchTerm() }});
  }
}
