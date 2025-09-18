import { Component, ChangeDetectionStrategy, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { ProductListComponent } from "../../../product/pages/product-list/product-list.component";
import { ProductService } from '../../../../core/services/product/product.service';
import { catchError } from 'rxjs';
import { Product, ProductFlags } from '../../../../core/models/product.model';
import { FormsModule } from '@angular/forms';
import { MerchantService } from '../../../../core/services/merchant/merchant.service';
import { Category } from '../../../../core/models/category.model';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-merchant-dashboard',
  standalone: true,
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.scss'],
  imports: [ProductListComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantDashboardComponent implements OnInit {
  id = input.required<string>();
  productService = inject(ProductService);
  merchantService = inject(MerchantService);
  authService = inject(AuthService);

  merchantId = computed(() => Number(this.id()));
  products = signal<Array<Product>>([]);
  categories = signal<Array<Category>>([]);
  selectedCategory = signal<Category | null>(null);

  ngOnInit() {
    this.merchantService
      .getCategories(this.merchantId())
      .subscribe(categories => {
        this.categories.set(categories);
        console.log(categories);
        if (categories.length) {
          this.selectedCategory.set(categories[0]);
          console.log(this.selectedCategory());
          this.loadProducts();
        }
      });
  }

  loadProducts() {
    const category = this.selectedCategory();
    if (category) {
      this.productService
        .getProductsByMerchantAndCategory(this.merchantId(), category.name)
        .subscribe(products => {
          if (this.authService.isAdmin()) {
            this.products.set(products);
          }
          else {
            this.products.set(products.filter(p => p.status & ProductFlags.Active));
          }
          console.log(this.products());
        });
    }
  }

  onCategoryChange(category: Category) {
    this.selectedCategory.set(category);
    this.loadProducts();
  }

  handleProductUpdate(updatedProduct: Product) {
    this.products.update(currentProducts =>
      currentProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  }
}