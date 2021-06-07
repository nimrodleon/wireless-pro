import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramoListComponent } from './tramo-list.component';

describe('TramoListComponent', () => {
  let component: TramoListComponent;
  let fixture: ComponentFixture<TramoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
