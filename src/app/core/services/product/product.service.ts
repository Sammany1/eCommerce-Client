import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../tokens/api-base-url.token';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  baseUrl = inject(API_BASE_URL);

  getAllProdcutsByMerchant(id: number) {
    return this.http.get<Array<Product>>(`${this.baseUrl}/products/merchant/${id}`)
  }

  searchProducts(searchTerm: string) {
    return this.http.get<Array<Product>>(`${this.baseUrl}/products/search?searchTerm=${searchTerm}`)
  }
}
