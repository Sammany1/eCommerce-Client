import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSearchComponent } from './merchant-search.component';

describe('MerchantSearchComponent', () => {
  let component: MerchantSearchComponent;
  let fixture: ComponentFixture<MerchantSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
