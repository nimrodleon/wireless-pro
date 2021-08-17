import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalServicesComponent } from './temporal-services.component';

describe('TemporalServicesComponent', () => {
  let component: TemporalServicesComponent;
  let fixture: ComponentFixture<TemporalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporalServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
