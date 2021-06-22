import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDailyComponent } from './payment-daily.component';

describe('PaymentDailyComponent', () => {
  let component: PaymentDailyComponent;
  let fixture: ComponentFixture<PaymentDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
