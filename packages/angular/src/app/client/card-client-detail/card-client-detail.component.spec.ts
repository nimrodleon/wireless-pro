import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClientDetailComponent } from './card-client-detail.component';

describe('CardClientDetailComponent', () => {
  let component: CardClientDetailComponent;
  let fixture: ComponentFixture<CardClientDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardClientDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
