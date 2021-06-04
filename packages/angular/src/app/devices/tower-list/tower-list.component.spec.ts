import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerListComponent } from './tower-list.component';

describe('TowerListComponent', () => {
  let component: TowerListComponent;
  let fixture: ComponentFixture<TowerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
