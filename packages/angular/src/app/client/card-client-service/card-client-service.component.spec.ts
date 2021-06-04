import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClientServiceComponent } from './card-client-service.component';

describe('CardClientServiceComponent', () => {
  let component: CardClientServiceComponent;
  let fixture: ComponentFixture<CardClientServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardClientServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardClientServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
