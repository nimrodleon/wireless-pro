import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTicketComponent } from './work-ticket.component';

describe('InstallationTicketComponent', () => {
  let component: WorkTicketComponent;
  let fixture: ComponentFixture<WorkTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
