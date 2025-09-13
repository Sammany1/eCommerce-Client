import { Component, inject, input, OnInit } from '@angular/core';
import { Merchant } from '../../../../core/models/merchant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-card',
  templateUrl: './merchant-card.component.html',
  styleUrls: ['./merchant-card.component.scss']
})
export class MerchantCardComponent {
  merchant = input.required<Merchant>();
  router = inject(Router);

  goToMerchantPage() {
    console.log('merchant clicked');
    this.router.navigateByUrl(`/merchant/${this.merchant().id}`);
  }
}
