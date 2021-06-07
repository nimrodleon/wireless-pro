import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageModalComponent } from './coverage-modal.component';

describe('CoverageModalComponent', () => {
  let component: CoverageModalComponent;
  let fixture: ComponentFixture<CoverageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
