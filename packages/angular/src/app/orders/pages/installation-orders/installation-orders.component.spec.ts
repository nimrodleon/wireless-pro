import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationOrdersComponent } from './installation-orders.component';

describe('InstallationOrdersComponent', () => {
  let component: InstallationOrdersComponent;
  let fixture: ComponentFixture<InstallationOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
