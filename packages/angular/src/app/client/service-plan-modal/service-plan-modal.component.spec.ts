import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePlanModalComponent } from './service-plan-modal.component';

describe('ServicePlanModalComponent', () => {
  let component: ServicePlanModalComponent;
  let fixture: ComponentFixture<ServicePlanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePlanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
