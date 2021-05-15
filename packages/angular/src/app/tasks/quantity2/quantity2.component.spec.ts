import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quantity2Component } from './quantity2.component';

describe('Quantity2Component', () => {
  let component: Quantity2Component;
  let fixture: ComponentFixture<Quantity2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quantity2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quantity2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
