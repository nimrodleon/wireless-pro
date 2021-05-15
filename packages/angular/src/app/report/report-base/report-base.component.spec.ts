import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBaseComponent } from './report-base.component';

describe('ReportBaseComponent', () => {
  let component: ReportBaseComponent;
  let fixture: ComponentFixture<ReportBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
