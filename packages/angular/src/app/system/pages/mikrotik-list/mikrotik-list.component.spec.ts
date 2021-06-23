import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MikrotikListComponent } from './mikrotik-list.component';

describe('MikrotikListComponent', () => {
  let component: MikrotikListComponent;
  let fixture: ComponentFixture<MikrotikListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MikrotikListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MikrotikListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
