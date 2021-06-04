import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOutagesComponent } from './card-outages.component';

describe('CardOutagesComponent', () => {
  let component: CardOutagesComponent;
  let fixture: ComponentFixture<CardOutagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOutagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOutagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
