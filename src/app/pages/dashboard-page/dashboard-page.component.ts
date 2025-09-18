import { Component, inject, OnInit, signal } from '@angular/core';
import { MerchantListComponent } from "../../features/merchant/pages/merchant-list/merchant-list.component";
import { MerchantService } from '../../core/services/merchant/merchant.service';
import { catchError, single } from 'rxjs';
import { Merchant } from '../../core/models/merchant.model';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [MerchantListComponent]
})
export class DashboardPageComponent implements OnInit {
  merchantService = inject(MerchantService);
  authService = inject(AuthService);
  merchants = signal<Array<Merchant>>([]);


  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.merchantService
        .getAllAdminMerchants(this.authService.userId())
        .subscribe((merchants) => {
          this.merchants.set(merchants);
        })
    }
    else {
      this.merchantService
        .getAllMerchants()
        .subscribe((merchants) => {
          this.merchants.set(merchants);
        })
    }
  }

}
