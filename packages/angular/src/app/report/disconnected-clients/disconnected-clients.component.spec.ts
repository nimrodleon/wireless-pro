import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectedClientsComponent } from './disconnected-clients.component';

describe('DisconnectedClientsComponent', () => {
  let component: DisconnectedClientsComponent;
  let fixture: ComponentFixture<DisconnectedClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectedClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
