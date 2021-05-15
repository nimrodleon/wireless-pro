import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AveriaAttendComponent } from './averia-attend.component';

describe('AveriaAttendComponent', () => {
  let component: AveriaAttendComponent;
  let fixture: ComponentFixture<AveriaAttendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AveriaAttendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AveriaAttendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
