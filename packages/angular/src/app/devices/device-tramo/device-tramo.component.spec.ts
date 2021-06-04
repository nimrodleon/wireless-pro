import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTramoComponent } from './device-tramo.component';

describe('DeviceTramoComponent', () => {
  let component: DeviceTramoComponent;
  let fixture: ComponentFixture<DeviceTramoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTramoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTramoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
