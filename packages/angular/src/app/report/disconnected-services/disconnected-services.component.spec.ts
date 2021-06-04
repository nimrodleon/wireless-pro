import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectedServicesComponent } from './disconnected-services.component';

describe('DisconnectedServicesComponent', () => {
  let component: DisconnectedServicesComponent;
  let fixture: ComponentFixture<DisconnectedServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectedServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
