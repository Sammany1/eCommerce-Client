import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { Product, ProductFlags } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product/product.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { single } from 'rxjs';

@Component({
  selector: 'app-product-card',
  imports: [ReactiveFormsModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  product = input.required<Product>();
  productUpdated = output<Product>(); // Use output() to emit events
  fp = inject(FormBuilder);
  productService = inject(ProductService);
  authService = inject(AuthService);
  ProductFlags = ProductFlags;

  isEditing = signal(false);
  message = signal<string | null>(null);
  updatedProductForm = this.fp.nonNullable.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    status: [0, Validators.required]
  });

  // View mode status
  isActive = computed(() => (this.product().status & ProductFlags.Active) !== 0);
  isInStock = computed(() => (this.product().status & ProductFlags.InStock) !== 0);


  isEditActive = true;
  isEditNotActive = true;
  isEditInStock = true;
  isEditOutOfStock = true;

  openEditForm() {
    this.updatedProductForm.setValue({
      name: this.product().name,
      price: this.product().price,
      status: this.product().status
    });
    this.isEditActive = this.isActive();
    this.isEditNotActive = !this.isActive();
    this.isEditInStock = this.isInStock();
    this.isEditOutOfStock = !this.isInStock();
    this.isEditing.set(true);
  }

  setActive(active: boolean) {
    if (this.updatedProductForm.invalid) {
      return;
    }
    let status = this.updatedProductForm.getRawValue().status;
    if (active) {
      status = status | ProductFlags.Active;
    } else {
      status = status & ~ProductFlags.Active;
    }
    this.updatedProductForm.controls.status.setValue(status);
    this.isEditActive = (status & ProductFlags.Active) !== 0;
    this.isEditNotActive = !this.isEditActive;
  }

  setInStock(inStock: boolean) {
    let status = this.updatedProductForm.getRawValue().status;
    if (inStock) {
      status = status | ProductFlags.InStock;
    } else {
      status = status & ~ProductFlags.InStock;
    }
    this.updatedProductForm.controls.status.setValue(status);
    this.isEditInStock = (status & ProductFlags.InStock) !== 0;
    this.isEditOutOfStock = !this.isEditInStock;
  }

  onSave() {
    console.log(this.updatedProductForm);
    const { name, price, status } = this.updatedProductForm.getRawValue();

    const updatedProduct: Product = {
      ...this.product(),
      name,
      price,
      status
    };
    this.productService.updateProduct(this.product().id, updatedProduct).subscribe({
      next: (updated) => {
        this.productUpdated.emit(updated);
        this.cancelEdit();
        this.message.set('Product updated successfully');
        // clear message after 3s
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => {
        this.message.set('Failed to update product');
        setTimeout(() => this.message.set(null), 3000);
      }
    })
  }

  cancelEdit() {
    this.isEditing.set(false);
  }
}
