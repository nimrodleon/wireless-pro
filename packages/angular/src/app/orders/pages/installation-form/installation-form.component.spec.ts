import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationFormComponent } from './installation-form.component';

describe('InstallationFormComponent', () => {
  let component: InstallationFormComponent;
  let fixture: ComponentFixture<InstallationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
