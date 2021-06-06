import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTowerComponent } from './device-tower.component';

describe('DeviceTowerComponent', () => {
  let component: DeviceTowerComponent;
  let fixture: ComponentFixture<DeviceTowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
