import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm = signal('');
  router = inject(Router);

  search() {
    if(this.searchTerm().length)
      this.router.navigate(['/search'], { queryParams: { query: this.searchTerm() }});
  }
}
