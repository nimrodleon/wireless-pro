import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfDevicesComponent } from './number-of-devices.component';

describe('NumberOfDevicesComponent', () => {
  let component: NumberOfDevicesComponent;
  let fixture: ComponentFixture<NumberOfDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
