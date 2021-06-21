import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationTicketComponent } from './installation-ticket.component';

describe('InstallationTicketComponent', () => {
  let component: InstallationTicketComponent;
  let fixture: ComponentFixture<InstallationTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
