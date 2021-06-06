import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramoModalComponent } from './tramo-modal.component';

describe('TramoModalComponent', () => {
  let component: TramoModalComponent;
  let fixture: ComponentFixture<TramoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
