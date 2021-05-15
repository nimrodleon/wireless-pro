import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentJournalComponent } from './payment-journal.component';

describe('PaymentJournalComponent', () => {
  let component: PaymentJournalComponent;
  let fixture: ComponentFixture<PaymentJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
