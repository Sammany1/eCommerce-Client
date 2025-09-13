import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Product, ProductFlags } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  product = input.required<Product>();
  ProductFlags = ProductFlags;

  isActive = computed(() => (this.product().status & ProductFlags.Active) !== 0);
  isInStock = computed(() => (this.product().status & ProductFlags.InStock) !== 0);
}
