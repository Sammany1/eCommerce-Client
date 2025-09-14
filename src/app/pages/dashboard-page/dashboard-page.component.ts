import { Component, inject, OnInit, signal } from '@angular/core';
import { MerchantListComponent } from "../../features/merchant/pages/merchant-list/merchant-list.component";
import { MerchantService } from '../../core/services/merchant/merchant.service';
import { catchError } from 'rxjs';
import { Merchant } from '../../core/models/merchant.model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [MerchantListComponent]
})
export class DashboardPageComponent implements OnInit {
  merchantService = inject(MerchantService);
  merchants = signal<Array<Merchant>>([]);
  
  ngOnInit(): void {
    this.merchantService
    .getAllMerchants()
    .pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((merchants) => {
      this.merchants.set(merchants);
    })
  }

}
