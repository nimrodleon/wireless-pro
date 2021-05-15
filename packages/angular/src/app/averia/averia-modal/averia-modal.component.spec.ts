import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AveriaModalComponent } from './averia-modal.component';

describe('AveriaModalComponent', () => {
  let component: AveriaModalComponent;
  let fixture: ComponentFixture<AveriaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AveriaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AveriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
