import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../tokens/api-base-url.token';
import { Merchant } from '../../models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  http = inject(HttpClient);
  baseUrl = inject(API_BASE_URL);

  getAllMerchants(){
    return this.http.get<Array<Merchant>>(`${this.baseUrl}/merchants`);
  }

  searchMerchants(searchTerm: string){
    return this.http.get<Array<Merchant>>(`${this.baseUrl}/merchants/search?name=${searchTerm}`);
  }
}
