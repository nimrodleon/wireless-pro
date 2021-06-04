import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AveriaListComponent } from './averia-list.component';

describe('AveriaListComponent', () => {
  let component: AveriaListComponent;
  let fixture: ComponentFixture<AveriaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AveriaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AveriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
