import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesWithoutPaymentComponent } from './services-without-payment.component';

describe('ServicesWithoutPaymentComponent', () => {
  let component: ServicesWithoutPaymentComponent;
  let fixture: ComponentFixture<ServicesWithoutPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesWithoutPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesWithoutPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
