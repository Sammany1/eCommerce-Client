import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MerchantService } from '../../core/services/merchant/merchant.service';
import { Merchant } from '../../core/models/merchant.model';
import { catchError, single } from 'rxjs';
import { MerchantListComponent } from "../../features/merchant/pages/merchant-list/merchant-list.component";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../core/models/product.model';
import { ProductListComponent } from '../../features/product/pages/product-list/product-list.component';

@Component({
  selector: 'app-search-result-page',
  imports: [MerchantListComponent, ProductListComponent],
  templateUrl: './search-result-page.component.html',
  styleUrl: './search-result-page.component.scss'
})
export class SearchResultPageComponent implements OnInit{
  route = inject(ActivatedRoute);
  searchTerm = signal<string>('');
  merchantService = inject(MerchantService);
  productSercive = inject(ProductService);
  merchants = signal<Array<Merchant>>([]);
  products = signal<Array<Product>>([]);
  showMerchants = signal(true);

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm.set(params.get('query') ?? '');
      this.search();
    })
  }

  search() {
    this.merchantService
    .searchMerchants(this.searchTerm())
    .pipe(
      catchError((err) => {
        throw err;
      }
      )
    ).subscribe((merchants) => {
      this.merchants.set(merchants);
    });

    this.productSercive
    .searchProducts(this.searchTerm())
    .pipe(
      catchError((err) => {
        throw err;
      })
    ).subscribe((products) => {
      this.products.set(products);
    })
  }

  toggleList() {
    this.showMerchants.update(show => !show);
  }
}
