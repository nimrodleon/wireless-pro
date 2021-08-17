import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkReportComponent } from './work-report.component';

describe('InstallationReportComponent', () => {
  let component: WorkReportComponent;
  let fixture: ComponentFixture<WorkReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
