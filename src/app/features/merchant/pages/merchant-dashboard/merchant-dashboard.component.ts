import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { ProductListComponent } from "../../../product/pages/product-list/product-list.component";
import { ProductService } from '../../../../core/services/product/product.service';
import { catchError } from 'rxjs';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-merchant-dashboard',
  standalone: true,
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css'],
  imports: [ProductListComponent]
})
export class MerchantDashboardComponent{
  id = input.required<string>();
  merchantId = computed(() => Number(this.id()));
  products = signal<Array<Product>>([]);

  productService = inject(ProductService);

  ngOnInit() {
    this.productService
      .getAllProdcutsByMerchant(this.merchantId())
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      ).subscribe((products) => {
        this.products.set(products);
      })

      console.log(this.products);
  }
}