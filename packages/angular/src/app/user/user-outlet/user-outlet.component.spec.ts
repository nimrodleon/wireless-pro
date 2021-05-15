import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOutletComponent } from './user-outlet.component';

describe('UserOutletComponent', () => {
  let component: UserOutletComponent;
  let fixture: ComponentFixture<UserOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
