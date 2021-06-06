import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerModalComponent } from './tower-modal.component';

describe('TowerModalComponent', () => {
  let component: TowerModalComponent;
  let fixture: ComponentFixture<TowerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
