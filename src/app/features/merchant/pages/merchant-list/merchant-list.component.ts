import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { MerchantCardComponent } from "../../../../shared/components/cards/merchant-card/merchant-card.component";
import { Merchant } from '../../../../core/models/merchant.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-merchant-list',
  imports: [MerchantCardComponent, FormsModule],
  templateUrl: './merchant-list.component.html',
  styleUrl: './merchant-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantListComponent { 
  merchants = input.required<Array<Merchant>>();

}
