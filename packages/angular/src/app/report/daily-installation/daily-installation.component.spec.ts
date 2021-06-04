import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInstallationComponent } from './daily-installation.component';

describe('DailyInstallationComponent', () => {
  let component: DailyInstallationComponent;
  let fixture: ComponentFixture<DailyInstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyInstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
