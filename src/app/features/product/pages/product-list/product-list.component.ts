import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ProductCardComponent } from "../../../../shared/components/cards/product-card/product-card.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [ProductCardComponent]
})
export class ProductListComponent{
  products = input.required<Array<Product>>();
  productUpdated = output<Product>(); 

  onProductUpdate(updatedProduct: Product) {
    this.productUpdated.emit(updatedProduct);
  }
}
