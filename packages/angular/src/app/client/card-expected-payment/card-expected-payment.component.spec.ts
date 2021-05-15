import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExpectedPaymentComponent } from './card-expected-payment.component';

describe('CardExpectedPaymentComponent', () => {
  let component: CardExpectedPaymentComponent;
  let fixture: ComponentFixture<CardExpectedPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardExpectedPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardExpectedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
