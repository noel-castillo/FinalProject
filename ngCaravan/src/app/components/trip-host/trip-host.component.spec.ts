import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripHostComponent } from './trip-host.component';

describe('TripHostComponent', () => {
  let component: TripHostComponent;
  let fixture: ComponentFixture<TripHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
