import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveClientsComponent } from './active-clients.component';

describe('ActiveClientsComponent', () => {
  let component: ActiveClientsComponent;
  let fixture: ComponentFixture<ActiveClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
