import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientServiceComponent } from './add-client-service.component';

describe('AddClientServiceComponent', () => {
  let component: AddClientServiceComponent;
  let fixture: ComponentFixture<AddClientServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
