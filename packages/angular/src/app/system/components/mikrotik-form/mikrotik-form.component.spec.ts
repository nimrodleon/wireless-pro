import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MikrotikFormComponent } from './mikrotik-form.component';

describe('MikrotikFormComponent', () => {
  let component: MikrotikFormComponent;
  let fixture: ComponentFixture<MikrotikFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MikrotikFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MikrotikFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
